export const ComponentUtils = {
  generateLabel: (label: string, options: { required?: boolean }) => {
    const { required } = options;
    return `${label + (required ? "*" : "")}`;
  },
};
