const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "primary-color": "#95cc43",
      "layout-body-background": "#fafcfa",
      "layout-header-background": "#114C00",
      "text-color": "#303030",
      "heading-color": "#303030",
      "layout-trigger-color": "#303030",
      "card-head-color": "#114C00",
      "label-required-color": "#114C00"
    }
  })
);
