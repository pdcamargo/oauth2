import React from 'react';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import nodeSass from 'node-sass';
import uglify from 'uglify-js';

import { ChakraProvider } from '@chakra-ui/react';

function tsCompile(
	source: string,
	options: ts.TranspileOptions = null,
): string {
	if (null === options) {
		options = {
			compilerOptions: { module: ts.ModuleKind.CommonJS },
		};
	}
	return ts.transpileModule(source, options).outputText;
}

function cssCompile(source: string): string {
	const result = nodeSass
		.renderSync({
			data: source,
		})
		.css.toString();

	return result;
}

const css = (cssName: string[]) => {
	const transformer = (name: string) => {
		return name.endsWith('.css')
			? (source: string) => source
			: cssCompile;
	};

	return cssName
		.map((name) =>
			transformer(name)(
				fs.readFileSync(
					path.join(__dirname, `../styles/${name}`),
					'utf8',
				),
			),
		)
		.join('\n');
};

const js = (jsName: string[]) =>
	uglify.minify(
		jsName
			.map((name) =>
				tsCompile(
					fs.readFileSync(
						path.join(__dirname, `../scripts/${name}`),
						'utf8',
					),
				),
			)
			.join('\n'),
	).code;

type HtmlProps = {
	title: string;
	children: React.ReactNode;
	cssFiles?: string[];
	scriptFiles?: string[];
};

const Html = ({
	title,
	cssFiles = [],
	scriptFiles = [],
	children,
}: HtmlProps) => {
	return (
		<html>
			<head>
				<style
					dangerouslySetInnerHTML={{
						__html: css(['index.scss', ...cssFiles]),
					}}
				/>
				<title>{title}</title>
			</head>
			<body>
				<ChakraProvider resetCSS>{children}</ChakraProvider>
				<script
					dangerouslySetInnerHTML={{
						__html: js(['index.ts', ...scriptFiles]),
					}}
				/>
			</body>
		</html>
	);
};

export default Html;
