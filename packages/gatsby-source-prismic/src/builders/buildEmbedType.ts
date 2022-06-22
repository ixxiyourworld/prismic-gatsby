import * as gatsby from "gatsby";
import * as RTE from "fp-ts/ReaderTaskEither";
import { pipe, identity } from "fp-ts/function";

import { buildObjectType } from "../lib/buildObjectType";

import { Dependencies } from "../types";

/**
 * Builds a GraphQL type used by Embed fields. The resulting type can be created
 * using Gatsby's `createTypes` action.
 */
// TODO: Move typename to Dependencies (create in `buildDependencies.ts`).
export const buildEmbedType: RTE.ReaderTaskEither<
	Dependencies,
	never,
	gatsby.GatsbyGraphQLType
> = pipe(
	RTE.ask<Dependencies>(),
	RTE.chain((deps) => {
		console.log('embed type');

		return buildObjectType({
			name: deps.nodeHelpers.createTypeName("EmbedType"),
			interfaces: ["Node"],
			fields: {
				id: "ID",
				title: "String",
				description: "String",
				width: "Int",
				height: "Int",
				html: "String",
				thumbnail_url: "String",
				thumbnail_width: "Int",
				thumbnail_height: "Int",
				raw: { type: "JSON", resolve: identity },
			},
			extensions: { infer: true },
		});
	}),
);
