import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import response from "../model/response";
import middleware from "../middleware/receiver";
import { type bodyModel } from "../model/body";
import Swal from "sweetalert2";
import { jwtDecode, JwtPayload } from "jwt-decode";
const env = process.env.MODE

export default defineComponent({
  mixins: [middleware],
  methods: {
    async sendReq(
      func: bodyModel,
      is_form: boolean = false,
      is_alert: boolean = false,
      is_decrypt: boolean = false,
      is_encrypt: boolean = false,
    ) {
      try {
        const router = useRouter();

        let res: typeof response = {
          status: false,
          message: "Error",
          status_code: 0,
          data: "",
        };
        const token = localStorage.getItem("token");
        let headers = {};
        if (is_form == true) {
          headers = {
            Authorization: token,
            "Content-Type": `multipart/form-data`,
          };
        } else {
          headers = { Authorization: token };
        }

        if (func.method == "GET") {
          res = await this.$axios.get(func.url + (func.data ? this.arrToParam(func.data) : ''), { headers });
        } else if (func.method == "POST") {
          res = await this.$axios.post(func.url, is_encrypt ?
            this.encryptData(func.data) : func.data, { headers });
        } else if (func.method == "PUT") {
          res = await this.$axios.put(func.url, is_encrypt ?
            this.encryptData(func.data) : func.data, { headers });
        } else if (func.method == "DELETE") {
          res = await this.$axios.delete(func.url, { headers });
        } else {
          throw "method not found";
        }

        if (!res.status) throw res.message;

        const Res = {
          status: true,
          message: is_decrypt ? jwtDecode<CustomJwtPayload>(res.data).message : res.data.message,
          data: is_decrypt ? this.decryptData(jwtDecode<CustomJwtPayload>(res.data).data) : res.data.data,
        }

        if (env == "development") console.table(Res)

        const status = is_decrypt ? jwtDecode<CustomJwtPayload>(res.data).status : res.data.status
        if (status == 401) {
          Swal.fire({ icon: 'error', title: 'Token Expired! please relogin!' })
          router.push('/login');
          return
        }

        return Res
      } catch (error: any) {
        if (env == "development") {
          if (is_alert) {
            if (error.response) {
              alert(error.response.data.message);
            } else {
              alert(error);
            }
          }
        }

        if (env == "development") {
          (error.response)
            ? console.log(error.response)
            : console.log(error);
        }

        return {
          status: false,
          message: error.response ? error.response.data.message : error,
        };
      }
    },
    arrToParam(obj: { [key: string]: any }): string {
      const urlParams = Object.keys(obj)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&");
      return `?${urlParams}`;
    },

    generateRules(validationNames: any, field: any): boolean {
      const fieldRules = validationNames.map((validationName: any) => {
        const ruleFunction = this.validationRules[validationName];
        if (ruleFunction) {
          return ruleFunction(field);
        }
      });
      // console.log(fieldRules)
      return fieldRules;
    },
    validateForm(rules: any, formData: any) {
      this.formErrors = {};
      this.countError = 0
      const fieldRules = {} as any;

      for (const rule of rules) {
        if (rule.validation && rule.validation.length > 0) {
          fieldRules[rule.model] = this.generateRules(rule.validation, rule.model)
        }
      }

      for (const field in fieldRules) {
        for (const rule of fieldRules[field]) {
          if (!rule(formData[field])) {
            this.formErrors[field] = rule(formData[field]);
            this.countError++
          }
        }
      }

      if (this.countError == 0) {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      formErrors: {} as FormErrors,
      countError: 0,
      validationRules: {
        required: (field: string) => (value: string) => value !== '' ? true : `This is required.`,
        email: (field: string) => (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
        numeric: (field: string) => (value: string) => /^\d+$/.test(value) || `Must contain only numbers.`,
        noSpace: (field: string) => (value: string) => /^\S+$/.test(value) || `This field cannot contain spaces.`,
        noSymbol: (field: string) => (value: string) => /^[a-zA-Z0-9\s]*$/.test(value) || `This cannot contain symbols.`,
        minLength: (field: string) => (value: string) => value.length >= 8 || `This must be at least 8 characters long.`,
        combinedValidation: (field: string) => (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s]+$/.test(value) ||
          `This must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`,
      } as any,
    };
  },
});

interface CustomJwtPayload extends JwtPayload {
  message?: string; 
  data?: any;     
  status: number | boolean
}

interface FormErrors {
  [field: string]: string; 
}