import * as RTE from "fp-ts/ReaderTaskEither";

import { FieldConfigCreator } from "../types";

/**
 * Builds a GraphQL field configuration object for a Select Custom Type field.
 * The resulting configuration object can be used in a GraphQL type.
 *
 * This function registers a typepath for the field.
 *
 * @param path - Path to the field.
 *
 * @returns GraphQL field configuration object.
 */
export const buildSelectFieldConfig: FieldConfigCreator = () =>
	RTE.right("String");
