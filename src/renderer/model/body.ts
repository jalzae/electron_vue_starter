type bodyModel = {
  method: string;
  url: string;
  data?: any;
}

const Body: bodyModel = {
  method: "",
  url: "",
  data: {},
};

export type { bodyModel };