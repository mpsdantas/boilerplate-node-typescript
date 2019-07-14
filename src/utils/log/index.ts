import variables from "../../../config/variables";

const opts = {
	logFilePath: variables.pathLog,
	timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
};

const log = require("simple-node-logger").createSimpleLogger(opts);

export default log;