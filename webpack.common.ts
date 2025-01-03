import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
	entry: {
		contentScript: "./src/content-script.ts",
		background: "./src/background.ts",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true, // Clean the output directory before emit.
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "static" }],
		}),
	],
};

export default config;
