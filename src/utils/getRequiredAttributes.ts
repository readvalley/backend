export default (model: any) => {
  return Object.entries(model.schema.paths).flatMap(([key, schema]: any) => {
    if (schema.isRequired) {
      return [key];
    }
    return [];
  })
};
