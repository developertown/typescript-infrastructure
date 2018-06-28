module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  testMatch: ["**/__tests__/*.(test|spec).(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
