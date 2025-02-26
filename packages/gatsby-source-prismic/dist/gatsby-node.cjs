'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const RTE = require('fp-ts/ReaderTaskEither');
const TE = require('fp-ts/TaskEither');
const T = require('fp-ts/Task');
const A = require('fp-ts/Array');
const _function = require('fp-ts/function');
const prismicT = require('@prismicio/types');
const prismicH = require('@prismicio/helpers');
const R = require('fp-ts/Record');
const S = require('fp-ts/Semigroup');
const struct = require('fp-ts/struct');
const ReadonlyA = require('fp-ts/ReadonlyArray');
const imgixGatsby = require('@imgix/gatsby/dist/pluginHelpers');
const O = require('fp-ts/Option');
const E = require('fp-ts/Either');
const I = require('fp-ts/Identity');
const prismic = require('@prismicio/client');
const prismicCustomTypes = require('@prismicio/custom-types-client');
const gatsbyFs = require('gatsby-source-filesystem');
const fetch = require('node-fetch');
const nodeHelpers = require('gatsby-node-helpers');
const imgixGatsbyHelpers = require('@imgix/gatsby/dist/pluginHelpers.browser');
const s = require('fp-ts/string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			if (k !== 'default') {
				const d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		}
	}
	n["default"] = e;
	return Object.freeze(n);
}

const RTE__namespace = /*#__PURE__*/_interopNamespace(RTE);
const TE__namespace = /*#__PURE__*/_interopNamespace(TE);
const T__namespace = /*#__PURE__*/_interopNamespace(T);
const A__namespace = /*#__PURE__*/_interopNamespace(A);
const prismicT__namespace = /*#__PURE__*/_interopNamespace(prismicT);
const prismicH__namespace = /*#__PURE__*/_interopNamespace(prismicH);
const R__namespace = /*#__PURE__*/_interopNamespace(R);
const S__namespace = /*#__PURE__*/_interopNamespace(S);
const struct__namespace = /*#__PURE__*/_interopNamespace(struct);
const ReadonlyA__namespace = /*#__PURE__*/_interopNamespace(ReadonlyA);
const imgixGatsby__namespace = /*#__PURE__*/_interopNamespace(imgixGatsby);
const O__namespace = /*#__PURE__*/_interopNamespace(O);
const E__namespace = /*#__PURE__*/_interopNamespace(E);
const I__namespace = /*#__PURE__*/_interopNamespace(I);
const prismic__namespace = /*#__PURE__*/_interopNamespace(prismic);
const prismicCustomTypes__namespace = /*#__PURE__*/_interopNamespace(prismicCustomTypes);
const gatsbyFs__namespace = /*#__PURE__*/_interopNamespace(gatsbyFs);
const fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
const nodeHelpers__namespace = /*#__PURE__*/_interopNamespace(nodeHelpers);
const imgixGatsbyHelpers__namespace = /*#__PURE__*/_interopNamespace(imgixGatsbyHelpers);
const s__namespace = /*#__PURE__*/_interopNamespace(s);

const getTypeName = (type) => type.config.name;

const buildUnionType = (config) => RTE__namespace.asks((deps) => deps.buildUnionType(config));

const createType = (type) => RTE__namespace.asks((deps) => deps.createTypes(type));

const createAllDocumentTypesType = (types) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(types, A__namespace.map(getTypeName), (types2) => buildUnionType({
  name: deps.nodeHelpers.createTypeName("AllDocumentTypes"),
  types: types2
}), RTE__namespace.chainFirst(createType))));

const PLUGIN_NAME = "gatsby-source-prismic";
const GLOBAL_TYPE_PREFIX = "Prismic";
const PRISMIC_API_IMAGE_FIELDS = [
  "alt",
  "copyright",
  "dimensions",
  "url"
];
const DEFAULT_IMGIX_PARAMS = {
  auto: "compress,format",
  fit: "max"
};
const DEFAULT_PLACEHOLDER_IMGIX_PARAMS = {
  w: 100,
  blur: 15
};
const DEFAULT_LANG = "*";
const REPORTER_TEMPLATE = `gatsby-source-prismic(%s) - %s`;
const PREVIEWABLE_NODE_ID_FIELD = "_previewable";
const WEBHOOK_SECRET_MISMATCH_MSG = "A webhook was received, but the webhook secret did not match the webhook secret provided in the plugin options. If this is unexpected, verify that the `webhookSecret` plugin option matches the webhook secret in your Prismic repository.";
const WEBHOOK_TEST_TRIGGER_SUCCESS_MSG = "Success! Received a test trigger webhook. When changes to your content are saved, Gatsby will automatically fetch the changes.";
const MISSING_SCHEMAS_MSG = "JSON schemas for all custom types are required";
const MISSING_SCHEMA_MSG = 'JSON model for "%s" is missing. If the Custom Type is no longer in use, you may provide "{}" as the JSON model.';
const FORBIDDEN_ACCESS_WITHOUT_ACCESS_TOKEN = "Unable to access the Prismic repository. Check the repository name. If the repository is secured, provide an access token.";
const FORBIDDEN_ACCESS_WITH_ACCESS_TOKEN = "Unable to access the Prismic repository. Check that the correct repository name and access token are provided.";
const FORBIDDEN_CUSTOM_TYPES_API_ACCESS = "Unable to access the Prismic Custom Types API. Check the customTypesApiToken option.";
const NON_EXISTENT_RELEASE_WITH_ACCESS_TOKEN_MSG = 'The given Release ID ("%s") could not be found. If the Release ID is correct, check that your access token has permission to view Releases.';
const NON_EXISTENT_RELEASE_WITHOUT_ACCESS_TOKEN_MSG = 'The given Release ID ("%s") could not be found. If the Release ID is correct, you may need to provide an access token with permission to view Releases.';

const buildObjectType = (config) => RTE__namespace.asks((deps) => deps.buildObjectType(config));

const mapRecordIndices = (f) => _function.flow(R__namespace.collect((index, value) => [f(index), value]), R__namespace.fromFoldable(S__namespace.last(), A__namespace.Foldable));

const buildBooleanFieldConfig = () => RTE__namespace.right("Boolean");

const buildColorFieldConfig = () => RTE__namespace.right("String");

const buildDateFieldConfig = () => RTE__namespace.right({
  type: "Date",
  extensions: { dateformat: {} }
});

const buildEmbedFieldConfig = () => _function.pipe(RTE__namespace.ask(), RTE__namespace.map((deps) => deps.nodeHelpers.createTypeName("EmbedType")));

const buildGeoPointFieldConfig = () => _function.pipe(RTE__namespace.ask(), RTE__namespace.map((deps) => deps.globalNodeHelpers.createTypeName("GeoPointType")));

const listTypeName = (typeName) => `[${typeName}]`;

const buildSchemaRecordType = (path, record, typeName = path) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("fields", () => buildFieldConfigMap(path, record)), RTE__namespace.chainW((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName(typeName),
  fields: scope.fields
})));

const buildGroupFieldConfig = (path, schema) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain(() => buildSchemaRecordType(path, schema.config.fields)), RTE__namespace.chainFirstW(createType), RTE__namespace.map(getTypeName), RTE__namespace.map(listTypeName));

const sanitizeImageURL = (url) => decodeURIComponent(url.replace(/\+/g, " "));

const stripURLQueryParameters = (url) => _function.pipe(O__namespace.tryCatch(() => new URL(url)), O__namespace.map((instance) => `${instance.origin}${instance.pathname}`), O__namespace.getOrElse(() => url));

const resolveUrl = (source) => {
  var _a;
  return source.url ? sanitizeImageURL(stripURLQueryParameters(source.url)) : (_a = source.url) != null ? _a : null;
};
const resolveWidth = (source) => {
  var _a;
  return (_a = source.dimensions) == null ? void 0 : _a.width;
};
const resolveHeight = (source) => {
  var _a;
  return (_a = source.dimensions) == null ? void 0 : _a.height;
};
const withExistingURLImgixParameters = (fieldConfig) => ({
  ...fieldConfig,
  resolve: (source, args, ...rest) => _function.pipe(O__namespace.Do, O__namespace.bind("url", () => O__namespace.fromNullable(source.url ? new URL(source.url) : null)), O__namespace.bind("existingImgixParams", (scope) => _function.pipe([...scope.url.searchParams.entries()], R__namespace.fromFoldable(S__namespace.last(), A__namespace.Foldable), O__namespace.of)), O__namespace.map((scope) => {
    var _a;
    return (_a = fieldConfig.resolve) == null ? void 0 : _a.call(fieldConfig, source, {
      ...args,
      imgixParams: {
        ...scope.existingImgixParams,
        ...args.imgixParams
      }
    }, ...rest);
  }), O__namespace.getOrElseW(_function.constNull))
});
const buildImageBaseFieldConfigMap = _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("imgixTypes", (scope) => RTE__namespace.right(imgixGatsby__namespace.createImgixGatsbyTypes({
  cache: scope.cache,
  resolveUrl,
  resolveWidth,
  resolveHeight,
  defaultParams: scope.pluginOptions.imageImgixParams,
  namespace: "Imgix"
}))), RTE__namespace.bind("urlField", (scope) => RTE__namespace.right(withExistingURLImgixParameters(scope.imgixTypes.fields.url))), RTE__namespace.bind("fixedField", (scope) => RTE__namespace.right(withExistingURLImgixParameters(scope.imgixTypes.fields.fixed))), RTE__namespace.bind("fluidField", (scope) => RTE__namespace.right(withExistingURLImgixParameters(scope.imgixTypes.fields.fluid))), RTE__namespace.bind("gatsbyImageDataField", (scope) => _function.pipe(RTE__namespace.right(withExistingURLImgixParameters(scope.imgixTypes.fields.gatsbyImageData)), RTE__namespace.chainFirst((field) => RTE__namespace.fromIO(() => field.type = "JSON")))), RTE__namespace.map((scope) => ({
  alt: "String",
  copyright: "String",
  dimensions: scope.globalNodeHelpers.createTypeName("ImageDimensionsType"),
  url: scope.urlField,
  fixed: scope.fixedField,
  fluid: scope.fluidField,
  gatsbyImageData: scope.gatsbyImageDataField,
  localFile: {
    type: "File",
    extensions: { link: {} }
  }
})));

const createThumbnailsType = (path, schema) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("thumbnails", () => {
  var _a, _b;
  return RTE__namespace.right((_b = (_a = schema.config) == null ? void 0 : _a.thumbnails) != null ? _b : []);
}), RTE__namespace.bind("fields", (scope) => _function.pipe(R__namespace.fromFoldableMap(S__namespace.last(), ReadonlyA__namespace.Foldable)(scope.thumbnails, (thumbnail) => [thumbnail.name, thumbnail]), R__namespace.map(() => scope.nodeHelpers.createTypeName("ImageThumbnailType")), (fields) => RTE__namespace.right(fields))), RTE__namespace.chain((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName([
    ...path,
    "ImageThumbnailsType"
  ]),
  fields: scope.fields
})), RTE__namespace.chainFirst(createType), RTE__namespace.map(getTypeName));
const buildImageFieldConfig = (path, schema) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("thumbnailsTypeName", () => {
  var _a, _b;
  return ReadonlyA__namespace.isEmpty((_b = (_a = schema.config) == null ? void 0 : _a.thumbnails) != null ? _b : []) ? RTE__namespace.right(void 0) : createThumbnailsType(path, schema);
}), RTE__namespace.bind("baseFields", () => buildImageBaseFieldConfigMap), RTE__namespace.chain((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName([...path, "ImageType"]),
  fields: scope.thumbnailsTypeName ? {
    ...scope.baseFields,
    thumbnails: {
      type: scope.thumbnailsTypeName,
      resolve: (source) => source
    }
  } : scope.baseFields
})), RTE__namespace.chainFirst(createType), RTE__namespace.map(getTypeName));

const buildLinkFieldConfig = () => _function.pipe(RTE__namespace.ask(), RTE__namespace.map((deps) => deps.nodeHelpers.createTypeName("LinkType")));

const buildNumberFieldConfig = () => RTE__namespace.right("Float");

const buildSelectFieldConfig = () => RTE__namespace.right("String");

const buildStructuredTextFieldConfig = () => _function.pipe(RTE__namespace.ask(), RTE__namespace.map((deps) => deps.nodeHelpers.createTypeName("StructuredTextType")));

const createTypes = _function.flow(A__namespace.map(createType), RTE__namespace.sequenceArray);

const requiredTypeName = (typeName) => typeName + "!";

const buildSliceType = (path, model) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe({}, R__namespace.isEmpty(model["non-repeat"]) ? _function.identity : R__namespace.upsertAt("primary", buildSchemaRecordType([...path, "primary"], model["non-repeat"])), R__namespace.isEmpty(model.repeat) ? _function.identity : R__namespace.upsertAt("items", buildSchemaRecordType([...path, "items"], model.repeat, [
  ...path,
  "item"
])), R__namespace.sequence(RTE__namespace.ApplicativeSeq), RTE__namespace.chainFirstW(_function.flow(R__namespace.collect((_, type) => type), createTypes)), RTE__namespace.map(R__namespace.mapWithIndex((field, type) => field === "items" ? _function.pipe(type, getTypeName, requiredTypeName, listTypeName, requiredTypeName) : _function.pipe(type, getTypeName, requiredTypeName))), RTE__namespace.chainW((fields) => buildObjectType({
  name: deps.nodeHelpers.createTypeName(path),
  fields: {
    ...fields,
    id: {
      type: "ID!",
      resolve: (source) => deps.nodeHelpers.createNodeId([
        ...path,
        deps.createContentDigest(source)
      ])
    },
    slice_type: "String!",
    slice_label: "String"
  },
  interfaces: [deps.globalNodeHelpers.createTypeName("SliceType")],
  extensions: { infer: false }
})))));
const buildSliceTypes = (path, choices) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bindW("sliceModels", () => _function.pipe(choices, R__namespace.filter((slice) => slice.type === prismicT__namespace.CustomTypeModelSliceType.Slice), RTE__namespace.right)), RTE__namespace.bindW("sliceTypeNames", (scope) => _function.pipe(scope.sliceModels, R__namespace.mapWithIndex((sliceName, sliceModel) => buildSliceType([...path, sliceName], sliceModel)), R__namespace.sequence(RTE__namespace.ApplicativeSeq), RTE__namespace.map(R__namespace.collect((_, type) => type)), RTE__namespace.chainFirstW(createTypes), RTE__namespace.map(A__namespace.map(getTypeName)))), RTE__namespace.bindW("sharedSliceModels", () => _function.pipe(choices, R__namespace.filter((slice) => slice.type === prismicT__namespace.CustomTypeModelSliceType.SharedSlice), RTE__namespace.right)), RTE__namespace.bindW("sharedSliceTypesNames", (scope) => _function.pipe(scope.sharedSliceModels, R__namespace.keys, A__namespace.map((sharedSliceId) => _function.pipe(scope.pluginOptions.sharedSliceModels, A__namespace.findFirst((sharedSliceModel) => sharedSliceModel.id === sharedSliceId), E__namespace.fromOption(() => new Error(`Could not find a Shared Slice model for a Shared Slice named "${sharedSliceId}"`)))), A__namespace.sequence(E__namespace.Applicative), RTE__namespace.fromEither, RTE__namespace.map(A__namespace.map((sharedSliceModel) => _function.pipe(sharedSliceModel.variations, ReadonlyA__namespace.map((variation) => scope.nodeHelpers.createTypeName([
  sharedSliceModel.id,
  variation.id
]))))), RTE__namespace.map(ReadonlyA__namespace.flatten), RTE__namespace.map(ReadonlyA__namespace.toArray))), RTE__namespace.map((scope) => [
  ...scope.sliceTypeNames,
  ...scope.sharedSliceTypesNames
]));
const buildSlicesFieldConfig = (path, schema) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(buildSliceTypes(path, schema.config.choices), RTE__namespace.chainW((types) => buildUnionType({
  name: deps.nodeHelpers.createTypeName([...path, "SlicesType"]),
  types,
  resolveType: (source) => _function.pipe(source, O__namespace.fromPredicate((source2) => "variation" in source2), O__namespace.map((source2) => deps.nodeHelpers.createTypeName([
    source2.slice_type,
    source2.variation
  ])), O__namespace.getOrElse(() => deps.nodeHelpers.createTypeName([
    ...path,
    source.slice_type
  ])))
})), RTE__namespace.chainFirstW(createType), RTE__namespace.map(_function.flow(getTypeName, requiredTypeName, listTypeName, requiredTypeName)))));

const buildTextFieldConfig = () => RTE__namespace.right("String");

const buildTimestampFieldConfig = () => RTE__namespace.right({
  type: "Date",
  extensions: { dateformat: {} }
});

const buildUIDFieldConfig = () => RTE__namespace.right("String!");

const dotPath = (path) => path.join(".");

const sprintf = (string, ...args) => {
  let i = 0;
  return string.replace(/%s/g, () => args[i++]);
};

const reportInfo = (text) => RTE__namespace.asks((deps) => _function.pipe(sprintf(REPORTER_TEMPLATE, deps.pluginOptions.repositoryName, text), deps.reportInfo));

const buildUnknownFieldConfig = (path, schema) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chainFirst(() => reportInfo(`An unknown field type "${schema.type}" was found at ${dotPath(path)}. A generic JSON type will be used. You can manually override the type using Gatsby's createSchemaCustomization API in your site's gatsby-node.js.`)), RTE__namespace.map(() => ({
  type: "JSON",
  resolve: _function.identity
})));

const buildNamedInferredNodeType = (name) => buildObjectType({
  name,
  interfaces: ["Node"],
  fields: {},
  extensions: { infer: true }
});

const buildInferredNodeType = (path) => _function.pipe(RTE__namespace.asks((deps) => deps.nodeHelpers.createTypeName(path)), RTE__namespace.chain(buildNamedInferredNodeType));

const buildIntegrationFieldConfig = (path) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain(() => buildInferredNodeType([...path, "IntegrationType"])), RTE__namespace.chainFirst(createType), RTE__namespace.map(getTypeName), RTE__namespace.map((type) => ({
  type,
  extensions: { link: {} }
})));

const toFieldConfig = (path, schema) => {
  switch (schema.type) {
    case prismicT__namespace.CustomTypeModelFieldType.Boolean: {
      return buildBooleanFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Color: {
      return buildColorFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Date: {
      return buildDateFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Embed: {
      return buildEmbedFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.GeoPoint: {
      return buildGeoPointFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Group: {
      return buildGroupFieldConfig(path, schema);
    }
    case prismicT__namespace.CustomTypeModelFieldType.Image: {
      return buildImageFieldConfig(path, schema);
    }
    case prismicT__namespace.CustomTypeModelFieldType.IntegrationFields: {
      return buildIntegrationFieldConfig(path);
    }
    case prismicT__namespace.CustomTypeModelFieldType.Link: {
      return buildLinkFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Number: {
      return buildNumberFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Select: {
      return buildSelectFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Slices: {
      if (schema.config.choices && Object.keys(schema.config.choices).length > 0) {
        return buildSlicesFieldConfig(path, schema);
      } else {
        return RTE__namespace.right(void 0);
      }
    }
    case prismicT__namespace.CustomTypeModelFieldType.StructuredText: {
      return buildStructuredTextFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Text: {
      return buildTextFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.Timestamp: {
      return buildTimestampFieldConfig();
    }
    case prismicT__namespace.CustomTypeModelFieldType.UID: {
      return buildUIDFieldConfig();
    }
    default: {
      return buildUnknownFieldConfig(path, schema);
    }
  }
};

const buildFieldConfigMap = (path, fieldSchemas) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(fieldSchemas, mapRecordIndices(deps.transformFieldName), R__namespace.mapWithIndex((name, schema) => toFieldConfig(_function.pipe(path, A__namespace.append(name)), schema)), R__namespace.sequence(RTE__namespace.ApplicativeSeq))), RTE__namespace.map(R__namespace.filter((fieldConfig) => Boolean(fieldConfig))));

const collectFields = (schema) => _function.pipe(schema.json, R__namespace.collect((_, value) => value), S__namespace.concatAll(struct__namespace.getAssignSemigroup())({}));
const buildDataFieldConfigMap = (customTypeName, fields) => _function.pipe(RTE__namespace.ask(), RTE__namespace.filterOrElse(() => !R__namespace.isEmpty(fields), () => new Error("No data fields in schema")), RTE__namespace.bindW("fieldConfigMap", () => buildFieldConfigMap([customTypeName, "data"], fields)), RTE__namespace.chainW((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName([customTypeName, "DataType"]),
  fields: scope.fieldConfigMap
})), RTE__namespace.chainFirstW(createType), RTE__namespace.map(getTypeName), RTE__namespace.map((typeName) => ({
  data: _function.pipe(typeName, requiredTypeName),
  dataRaw: {
    type: "JSON!",
    resolve: (source) => source.data
  }
})), RTE__namespace.orElse(() => RTE__namespace.right(void 0)));
const createCustomType = (customType) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("fields", () => RTE__namespace.right(collectFields(customType))), RTE__namespace.bind("partitionedFields", (scope) => _function.pipe(scope.fields, R__namespace.partition((field) => field.type === prismicT__namespace.CustomTypeModelFieldType.UID), (partitionedFields) => RTE__namespace.right(partitionedFields))), RTE__namespace.bind("rootFieldConfigMap", (scope) => _function.pipe(scope.partitionedFields.right, R__namespace.collect((k, a) => [k, a]), A__namespace.map(([k, a]) => a.type === prismicT__namespace.CustomTypeModelFieldType.UID ? ["uid", a] : [k, a]), R__namespace.fromFoldable(S__namespace.last(), A__namespace.Foldable), (fields) => buildFieldConfigMap([customType.id], fields))), RTE__namespace.bindW("dataFieldConfigMap", (scope) => buildDataFieldConfigMap(customType.id, scope.partitionedFields.left)), RTE__namespace.chainW((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName(customType.id),
  fields: {
    ...scope.rootFieldConfigMap,
    ...scope.dataFieldConfigMap,
    [scope.nodeHelpers.createFieldName("id")]: "ID!",
    alternate_languages: _function.pipe(scope.nodeHelpers.createTypeName("AlternateLanguageType"), requiredTypeName, listTypeName, requiredTypeName),
    first_publication_date: {
      type: "Date!",
      extensions: { dateformat: {} }
    },
    href: "String!",
    lang: "String!",
    last_publication_date: {
      type: "Date!",
      extensions: { dateformat: {} }
    },
    tags: "[String!]!",
    type: "String!",
    url: {
      type: "String",
      resolve: (source) => prismicH__namespace.asLink(source, scope.pluginOptions.linkResolver)
    },
    [PREVIEWABLE_NODE_ID_FIELD]: {
      type: "ID!",
      resolve: (source) => source[scope.nodeHelpers.createFieldName("id")]
    }
  },
  interfaces: ["Node"],
  extensions: { infer: false }
})), RTE__namespace.chainFirstW(createType));

const buildSharedSliceVariationType = (path, variationModel) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe({}, R__namespace.isEmpty(variationModel.primary) ? _function.identity : R__namespace.upsertAt("primary", buildSchemaRecordType([...path, variationModel.id, "primary"], variationModel.primary)), R__namespace.isEmpty(variationModel.items) ? _function.identity : R__namespace.upsertAt("items", buildSchemaRecordType([...path, variationModel.id, "items"], variationModel.items, [...path, variationModel.id, "item"])), R__namespace.sequence(RTE__namespace.ApplicativeSeq), RTE__namespace.chainFirstW(_function.flow(R__namespace.collect((_, type) => type), createTypes)), RTE__namespace.map(R__namespace.mapWithIndex((field, type) => field === "items" ? _function.pipe(type, getTypeName, requiredTypeName, listTypeName, requiredTypeName) : _function.pipe(type, getTypeName, requiredTypeName))), RTE__namespace.chainW((fields) => buildObjectType({
  name: deps.nodeHelpers.createTypeName([...path, variationModel.id]),
  fields: {
    ...fields,
    id: {
      type: "ID!",
      resolve: (source) => deps.nodeHelpers.createNodeId([
        ...path,
        variationModel.id,
        deps.createContentDigest(source)
      ])
    },
    slice_type: "String!",
    slice_label: "String",
    version: "String!",
    variation: "String!"
  },
  interfaces: [
    deps.globalNodeHelpers.createTypeName("SliceType"),
    deps.globalNodeHelpers.createTypeName("SharedSliceType")
  ],
  extensions: { infer: false }
})))));
const buildSharedSliceVariationTypes = (path, variations) => _function.pipe(RTE__namespace.right(variations), RTE__namespace.map(ReadonlyA__namespace.map((variation) => buildSharedSliceVariationType(path, variation))), RTE__namespace.chain(RTE__namespace.sequenceArray), RTE__namespace.map((types) => types));

const createSharedSlice = (sharedSliceModel) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("variationTypes", () => _function.pipe(buildSharedSliceVariationTypes([sharedSliceModel.id], sharedSliceModel.variations), RTE__namespace.chainFirstW(createTypes), RTE__namespace.map(A__namespace.map(getTypeName)))), RTE__namespace.chainW((scope) => buildUnionType({
  name: scope.nodeHelpers.createTypeName([sharedSliceModel.id]),
  types: scope.variationTypes,
  resolveType: (source) => scope.nodeHelpers.createTypeName([
    source.slice_type,
    source.variation
  ])
})), RTE__namespace.chainFirstW(createType));

const createNodeOfType = (record, type) => RTE__namespace.asks((deps) => _function.pipe(record, deps.nodeHelpers.createNodeFactory(type), I__namespace.chainFirst(deps.createNode)));

const createTypePath = (serializedTypePath) => _function.pipe(RTE__namespace.right({
  id: serializedTypePath.path,
  kind: serializedTypePath.kind,
  path: serializedTypePath.path,
  type: serializedTypePath.type
}), RTE__namespace.chain((node) => createNodeOfType(node, "TypePathType")), RTE__namespace.map(_function.constVoid));

const customTypeModelDefinitionToCustomTypeModel = (id, modelDefinition) => ({
  id,
  json: modelDefinition,
  label: id,
  status: true,
  repeatable: true
});
const shallowArrayMergeByProperty = (property, a, b) => {
  return [
    ...a.filter((aElement) => !b.some((bElement) => Object.is(bElement[property], aElement[property]))),
    ...b
  ];
};
const preparePluginOptions = async (unpreparedPluginOptions) => {
  const result = {
    apiEndpoint: prismic__namespace.getEndpoint(unpreparedPluginOptions.repositoryName),
    imageImgixParams: DEFAULT_IMGIX_PARAMS,
    imagePlaceholderImgixParams: DEFAULT_PLACEHOLDER_IMGIX_PARAMS,
    shouldDownloadFiles: {},
    createRemoteFileNode: gatsbyFs__namespace.createRemoteFileNode,
    transformFieldName: (fieldName) => fieldName.replace(/-/g, "_"),
    fetch: fetch__default["default"],
    customTypeModels: [],
    sharedSliceModels: [],
    lang: DEFAULT_LANG,
    ...unpreparedPluginOptions
  };
  if (unpreparedPluginOptions.schemas) {
    const convertedModels = Object.keys(unpreparedPluginOptions.schemas).map((id) => {
      if (unpreparedPluginOptions.schemas) {
        const modelDefinition = unpreparedPluginOptions.schemas[id];
        return customTypeModelDefinitionToCustomTypeModel(id, modelDefinition);
      }
    }).filter((model) => Boolean(model));
    result.customTypeModels = shallowArrayMergeByProperty("id", convertedModels, result.customTypeModels);
  }
  if (unpreparedPluginOptions.customTypesApiToken) {
    const customTypesClient = prismicCustomTypes__namespace.createClient({
      repositoryName: unpreparedPluginOptions.repositoryName,
      token: unpreparedPluginOptions.customTypesApiToken,
      endpoint: unpreparedPluginOptions.customTypesApiEndpoint,
      fetch: result.fetch
    });
    const customTypeModels = await customTypesClient.getAllCustomTypes();
    const sharedSliceModels = await customTypesClient.getAllSharedSlices();
    result.customTypeModels = shallowArrayMergeByProperty("id", customTypeModels, result.customTypeModels);
    result.sharedSliceModels = shallowArrayMergeByProperty("id", sharedSliceModels, result.sharedSliceModels);
  }
  return result;
};

const throwError = (error) => {
  throw error;
};

const buildAlternateLanguageType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildObjectType({
  name: deps.nodeHelpers.createTypeName("AlternateLanguageType"),
  fields: {
    id: "ID",
    uid: "String",
    lang: "String",
    type: "String",
    document: {
      type: deps.nodeHelpers.createTypeName("AllDocumentTypes"),
      resolve: (source) => deps.nodeHelpers.createNodeId(source.id),
      extensions: { link: {} }
    },
    raw: { type: "JSON", resolve: _function.identity }
  }
})));

const buildEmbedType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => {
  console.log("embed type");
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
      raw: { type: "JSON", resolve: _function.identity }
    },
    extensions: { infer: true }
  });
}));

const buildGeoPointType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildObjectType({
  name: deps.globalNodeHelpers.createTypeName("GeoPointType"),
  fields: {
    longitude: "Float!",
    latitude: "Float!"
  }
})));

const buildImageDimensionsType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildObjectType({
  name: deps.globalNodeHelpers.createTypeName("ImageDimensionsType"),
  fields: {
    width: "Int!",
    height: "Int!"
  }
})));

const buildImageThumbnailType = _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("imageFields", () => buildImageBaseFieldConfigMap), RTE__namespace.chain((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName("ImageThumbnailType"),
  fields: scope.imageFields
})));

const buildImgixImageTypes = _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("imgixTypes", (scope) => RTE__namespace.right(imgixGatsby__namespace.createImgixGatsbyTypes({
  cache: scope.cache,
  resolveUrl: () => "",
  namespace: "Imgix"
}))), RTE__namespace.bind("objectTypes", (scope) => RTE__namespace.right(_function.pipe(scope.imgixTypes.types, A__namespace.map(scope.schema.buildObjectType)))), RTE__namespace.bind("enumTypes", (scope) => RTE__namespace.right(_function.pipe(scope.imgixTypes.enumTypes, A__namespace.map(scope.schema.buildEnumType)))), RTE__namespace.bind("inputTypes", (scope) => RTE__namespace.right(_function.pipe(scope.imgixTypes.inputTypes, A__namespace.map(scope.schema.buildInputObjectType)))), RTE__namespace.map((scope) => [
  ...scope.objectTypes,
  ...scope.enumTypes,
  ...scope.inputTypes
]));

const buildLinkType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildObjectType({
  name: deps.nodeHelpers.createTypeName("LinkType"),
  fields: {
    link_type: deps.globalNodeHelpers.createTypeName("LinkTypeEnum"),
    isBroken: "Boolean",
    url: {
      type: "String",
      resolve: (source) => prismicH__namespace.asLink(source, deps.pluginOptions.linkResolver)
    },
    target: "String",
    size: "Int",
    id: "ID",
    type: "String",
    tags: "[String]",
    lang: "String",
    slug: "String",
    uid: "String",
    document: {
      type: deps.nodeHelpers.createTypeName("AllDocumentTypes"),
      resolve: (source) => source.link_type === prismicT__namespace.LinkType.Document && "isBroken" in source && !source.isBroken ? deps.nodeHelpers.createNodeId(source.id) : null,
      extensions: { link: {} }
    },
    localFile: {
      type: "File",
      extensions: {
        link: {}
      }
    },
    raw: { type: "JSON", resolve: _function.identity }
  }
})));

const buildEnumType = (config) => RTE__namespace.asks((deps) => deps.buildEnumType(config));

const buildLinkTypeEnumType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildEnumType({
  name: deps.globalNodeHelpers.createTypeName("LinkTypeEnum"),
  values: { Any: {}, Document: {}, Media: {}, Web: {} }
})));

const buildInterfaceType = (config) => RTE__namespace.asks((deps) => deps.buildInterfaceType(config));

const buildSharedSliceInterface = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildInterfaceType({
  name: deps.globalNodeHelpers.createTypeName("SharedSliceType"),
  fields: {
    id: "ID!",
    slice_type: "String!",
    slice_label: "String",
    variation: "String!",
    version: "String!"
  }
})));

const buildSliceInterface = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildInterfaceType({
  name: deps.globalNodeHelpers.createTypeName("SliceType"),
  fields: {
    id: "ID!",
    slice_type: "String!",
    slice_label: "String"
  }
})));

const buildScalarType = (config) => RTE__namespace.asks((deps) => deps.buildScalarType(config));

const buildStructuredTextType = _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("structuredTextScalar", (deps) => buildScalarType({
  name: deps.globalNodeHelpers.createTypeName("StructuredText"),
  description: "Text content with rich formatting capabilities using a Prismic format called Structured Text."
})), RTE__namespace.chainFirst((scope) => createType(scope.structuredTextScalar)), RTE__namespace.chain((scope) => buildObjectType({
  name: scope.nodeHelpers.createTypeName("StructuredTextType"),
  fields: {
    text: {
      type: "String",
      resolve: (source) => prismicH__namespace.asText(source)
    },
    html: {
      type: "String",
      resolve: (source) => prismicH__namespace.asHTML(source, scope.pluginOptions.linkResolver, scope.pluginOptions.htmlSerializer)
    },
    richText: {
      type: requiredTypeName(scope.structuredTextScalar.config.name),
      resolve: _function.identity
    },
    raw: {
      type: requiredTypeName(scope.structuredTextScalar.config.name),
      resolve: _function.identity,
      deprecationReason: "This field has been renamed to `richText`. The `richText` field has the same value the `raw` field."
    }
  }
})));

const buildTypePathType = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => buildObjectType({
  name: deps.nodeHelpers.createTypeName("TypePathType"),
  fields: {
    kind: "String!",
    path: "[String!]!",
    type: "String!"
  },
  interfaces: ["Node"],
  extensions: { infer: false }
})));

var TypePathKind;
(function(TypePathKind2) {
  TypePathKind2["CustomType"] = "CustomType";
  TypePathKind2["SharedSliceVariation"] = "SharedSliceVariation";
  TypePathKind2["Field"] = "Field";
})(TypePathKind || (TypePathKind = {}));
var PrismicSpecialType;
(function(PrismicSpecialType2) {
  PrismicSpecialType2["Document"] = "Document";
  PrismicSpecialType2["DocumentData"] = "DocumentData";
  PrismicSpecialType2["SharedSliceVariation"] = "SharedSliceVariation";
  PrismicSpecialType2["Unknown"] = "Unknown";
})(PrismicSpecialType || (PrismicSpecialType = {}));
var PrismicWebhookType;
(function(PrismicWebhookType2) {
  PrismicWebhookType2["APIUpdate"] = "api-update";
  PrismicWebhookType2["TestTrigger"] = "test-trigger";
})(PrismicWebhookType || (PrismicWebhookType = {}));

const IS_PROXY = Symbol("IS_PROXY");
const createGetProxy = (target, get) => {
  target[IS_PROXY] = true;
  return new Proxy(target, { get });
};

const alternateLanguages = (config) => {
  return config.value.map((alternateLanguage) => {
    const value = {
      ...alternateLanguage,
      raw: alternateLanguage
    };
    return createGetProxy(value, (target, prop, receiver) => {
      if (prop === "document") {
        return config.getNode(value.id) || null;
      }
      return Reflect.get(target, prop, receiver);
    });
  });
};

const isDocument = (value) => {
  return typeof value === "object" && value !== null && "type" in value;
};
const document = (config) => {
  const fields = {
    ...config.value,
    __typename: config.nodeHelpers.createTypeName(config.path),
    _previewable: config.value.id,
    alternate_languages: alternateLanguages({
      ...config,
      value: config.value["alternate_languages"]
    }),
    url: prismicH__namespace.asLink(config.value, config.linkResolver),
    data: {},
    dataRaw: config.value.data
  };
  if (Object.keys(config.value.data).length > 0) {
    fields.data = normalize({
      ...config,
      value: config.value.data,
      path: [...config.path, "data"]
    });
  }
  return config.nodeHelpers.createNodeFactory(config.value.type)(fields);
};

const isDocumentDataField = (value) => {
  return typeof value === "object" && value !== null;
};
const documentData = (config) => {
  const result = {};
  for (const key in config.value) {
    const transformedKey = config.transformFieldName(key);
    result[transformedKey] = normalize({
      ...config,
      value: config.value[key],
      path: [...config.path, transformedKey]
    });
  }
  return result;
};

const isGroupField = (value) => {
  return Array.isArray(value) && value.every((element) => typeof element === "object" && element !== null);
};
const group = (config) => {
  return config.value.map((element) => {
    const result = {};
    for (const key in element) {
      const transformedKey = config.transformFieldName(key);
      result[transformedKey] = normalize({
        ...config,
        value: element[key],
        path: [...config.path, transformedKey]
      });
    }
    return result;
  });
};

const getURLSearchParams = (url) => {
  const urlInstance = new URL(url);
  const result = {};
  for (const [key, value] of urlInstance.searchParams.entries()) {
    result[key] = value;
  }
  return result;
};
const isImageField = (value) => {
  return typeof value === "object" && value !== null;
};
const buildImageField = (config) => {
  if (config.value.url) {
    const imgixParams = {
      ...getURLSearchParams(config.value.url),
      ...config.imageImgixParams
    };
    const placeholderImgixParams = config.imagePlaceholderImgixParams;
    const url = new URL(config.value.url);
    const normalizedURL = sanitizeImageURL(stripURLQueryParameters(url.toString()));
    const populatedUrl = new URL(url.toString());
    for (const paramKey in imgixParams) {
      populatedUrl.searchParams.set(paramKey, String(imgixParams[paramKey]));
    }
    const fixed = imgixGatsbyHelpers__namespace.buildFixedObject({
      url: normalizedURL,
      args: {
        width: 400,
        imgixParams,
        placeholderImgixParams
      },
      sourceWidth: config.value.dimensions.width,
      sourceHeight: config.value.dimensions.height
    });
    const fluid = imgixGatsbyHelpers__namespace.buildFluidObject({
      url: normalizedURL,
      args: {
        maxWidth: 800,
        imgixParams,
        placeholderImgixParams
      },
      sourceWidth: config.value.dimensions.width,
      sourceHeight: config.value.dimensions.height
    });
    const gatsbyImageData = imgixGatsbyHelpers__namespace.buildGatsbyImageDataObject({
      url: normalizedURL,
      dimensions: config.value.dimensions,
      defaultParams: imgixParams,
      resolverArgs: {}
    });
    return {
      url: sanitizeImageURL(populatedUrl.toString()),
      alt: config.value.alt,
      copyright: config.value.copyright,
      dimensions: config.value.dimensions,
      fixed,
      fluid,
      gatsbyImageData,
      localFile: {
        publicURL: config.value.url,
        childImageSharp: {
          fixed,
          fluid,
          gatsbyImageData
        }
      }
    };
  } else {
    return {
      url: null,
      alt: null,
      copyright: null,
      dimensions: null,
      fixed: null,
      gatsbyImageData: null,
      fluid: null,
      localFile: null
    };
  }
};
const image = (config) => {
  const result = {
    ...buildImageField({
      value: config.value,
      imageImgixParams: config.imageImgixParams,
      imagePlaceholderImgixParams: config.imagePlaceholderImgixParams
    }),
    thumbnails: {}
  };
  const thumbnailNames = Object.keys(config.value).filter((key) => !PRISMIC_API_IMAGE_FIELDS.includes(key));
  for (const thumbnailName of thumbnailNames) {
    result.thumbnails[thumbnailName] = buildImageField({
      value: config.value[thumbnailName],
      imageImgixParams: config.imageImgixParams,
      imagePlaceholderImgixParams: config.imagePlaceholderImgixParams
    });
  }
  return result;
};

const isLinkField = (value) => {
  return typeof value === "object" && (value === null || "link_type" in value);
};
const link = (config) => {
  const value = {
    ...config.value,
    url: prismicH__namespace.asLink(config.value, config.linkResolver),
    localFile: void 0,
    raw: config.value
  };
  if (config.value.link_type === prismicT__namespace.LinkType.Media && "url" in config.value) {
    value.localFile = {
      publicURL: config.value.url
    };
  }
  return createGetProxy(value, (target, prop, receiver) => {
    if (prop === "document" && config.value.link_type === prismicT__namespace.LinkType.Document && "id" in config.value && !config.value.isBroken) {
      return config.getNode(config.value.id) || null;
    }
    return Reflect.get(target, prop, receiver);
  });
};

const isStructuredTextField = (value) => {
  return Array.isArray(value) && value.every((element) => "type" in element);
};
const structuredText = (config) => {
  return {
    html: prismicH__namespace.asHTML(config.value, config.linkResolver, config.htmlSerializer),
    text: prismicH__namespace.asText(config.value),
    richText: config.value,
    raw: config.value
  };
};

const isSlice = (value) => {
  return typeof value === "object" && value !== null && "slice_type" in value;
};
const isSharedSlice = (value) => "variation" in value;
const slice = (config) => {
  const { primary, items, ...value } = config.value;
  const result = {
    ...value,
    __typename: config.nodeHelpers.createTypeName(config.path),
    id: config.nodeHelpers.createNodeId([
      ...config.path,
      JSON.stringify(config.value)
    ]),
    slice_type: config.value.slice_type,
    slice_label: config.value.slice_label
  };
  result.primary = {};
  for (const key in primary) {
    const transformedKey = config.transformFieldName(key);
    result.primary[transformedKey] = normalize({
      ...config,
      value: config.value.primary[key],
      path: [...config.path, "primary", transformedKey]
    });
  }
  result.items = items.map((item) => {
    const result2 = {};
    for (const key in item) {
      const transformedKey = config.transformFieldName(key);
      result2[transformedKey] = normalize({
        ...config,
        value: item[key],
        path: [...config.path, "items", transformedKey]
      });
    }
    return result2;
  });
  return result;
};

const isSlices = (value) => {
  return Array.isArray(value) && value.every((element) => isSlice(element));
};
const slices = (config) => {
  return config.value.map((element) => {
    return normalize({
      ...config,
      value: element,
      path: isSharedSlice(element) ? [element.slice_type, element.variation] : [...config.path, element.slice_type]
    });
  });
};

function assertType(type, guard, value) {
  if (!guard(value)) {
    throw new Error(`Value is not expected type ${type}`);
  }
}
const normalize = (config) => {
  const type = config.getTypePath(config.path);
  if (!type) {
    return config.value;
  }
  switch (type.type) {
    case PrismicSpecialType.Document: {
      assertType(PrismicSpecialType.Document, isDocument, config.value);
      return document({
        ...config,
        value: config.value
      });
    }
    case PrismicSpecialType.DocumentData: {
      assertType(PrismicSpecialType.DocumentData, isDocumentDataField, config.value);
      return documentData({
        ...config,
        value: config.value
      });
    }
    case prismicT__namespace.CustomTypeModelFieldType.Group: {
      assertType(prismicT__namespace.CustomTypeModelFieldType.Group, isGroupField, config.value);
      return group({
        ...config,
        value: config.value
      });
    }
    case prismicT__namespace.CustomTypeModelFieldType.Slices: {
      assertType(prismicT__namespace.CustomTypeModelFieldType.Slices, isSlices, config.value);
      return slices({
        ...config,
        value: config.value
      });
    }
    case prismicT__namespace.CustomTypeModelSliceType.Slice:
    case PrismicSpecialType.SharedSliceVariation: {
      assertType(prismicT__namespace.CustomTypeModelSliceType.Slice, isSlice, config.value);
      return slice({
        ...config,
        value: config.value
      });
    }
    case prismicT__namespace.CustomTypeModelFieldType.Link: {
      assertType(prismicT__namespace.CustomTypeModelFieldType.Link, isLinkField, config.value);
      return link({
        value: config.value,
        path: config.path,
        getNode: config.getNode,
        linkResolver: config.linkResolver
      });
    }
    case prismicT__namespace.CustomTypeModelFieldType.Image: {
      assertType(prismicT__namespace.CustomTypeModelFieldType.Image, isImageField, config.value);
      return image({
        value: config.value,
        path: config.path,
        imageImgixParams: config.imageImgixParams,
        imagePlaceholderImgixParams: config.imagePlaceholderImgixParams
      });
    }
    case prismicT__namespace.CustomTypeModelFieldType.StructuredText: {
      assertType(prismicT__namespace.CustomTypeModelFieldType.StructuredText, isStructuredTextField, config.value);
      return structuredText({
        value: config.value,
        path: config.path,
        linkResolver: config.linkResolver,
        htmlSerializer: config.htmlSerializer
      });
    }
    default: {
      return config.value;
    }
  }
};

const fieldToTypePaths = (path, model, transformFieldName) => {
  switch (model.type) {
    case prismicT__namespace.CustomTypeModelFieldType.UID: {
      return [];
    }
    case prismicT__namespace.CustomTypeModelFieldType.Group: {
      const fields = Object.entries(model.config.fields).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([...path, transformFieldName(fieldId)], fieldModel, transformFieldName));
      return [{ kind: TypePathKind.Field, type: model.type, path }, ...fields];
    }
    case prismicT__namespace.CustomTypeModelFieldType.Slices: {
      const choices = (model.config.choices && Object.entries(model.config.choices) || []).filter((entry) => entry[1].type === prismicT__namespace.CustomTypeModelSliceType.Slice).flatMap(([choiceId, choiceModel]) => fieldToTypePaths([...path, choiceId], choiceModel, transformFieldName));
      return [{ kind: TypePathKind.Field, type: model.type, path }, ...choices];
    }
    case prismicT__namespace.CustomTypeModelSliceType.Slice: {
      const primary = Object.entries(model["non-repeat"] || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([...path, "primary", transformFieldName(fieldId)], fieldModel, transformFieldName));
      const items = Object.entries(model.repeat || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([...path, "items", transformFieldName(fieldId)], fieldModel, transformFieldName));
      return [
        { kind: TypePathKind.Field, type: model.type, path },
        ...primary,
        ...items
      ];
    }
    default: {
      return [
        {
          kind: TypePathKind.Field,
          path,
          type: model.type
        }
      ];
    }
  }
};
const customTypeModelToTypePaths = (customTypeModel, transformFieldName) => {
  const definition = customTypeModel.json;
  const fieldModels = Object.assign({}, ...Object.values(definition));
  const hasDataFields = Object.values(fieldModels).filter((fieldModel) => fieldModel.type !== prismicT__namespace.CustomTypeModelFieldType.UID).length > 0;
  const documentTypePath = {
    kind: TypePathKind.CustomType,
    type: PrismicSpecialType.Document,
    path: [customTypeModel.id]
  };
  if (hasDataFields) {
    const data = Object.entries(fieldModels).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([customTypeModel.id, "data", transformFieldName(fieldId)], fieldModel, transformFieldName));
    return [
      documentTypePath,
      {
        kind: TypePathKind.Field,
        type: PrismicSpecialType.DocumentData,
        path: [customTypeModel.id, "data"]
      },
      ...data
    ];
  } else {
    return [documentTypePath];
  }
};
const sharedSliceModelToTypePaths = (sharedSliceModel, transformFieldName) => {
  return sharedSliceModel.variations.flatMap((variation) => {
    const primary = Object.entries(variation.primary || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([
      sharedSliceModel.id,
      variation.id,
      "primary",
      transformFieldName(fieldId)
    ], fieldModel, transformFieldName));
    const items = Object.entries(variation.items || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([
      sharedSliceModel.id,
      variation.id,
      "items",
      transformFieldName(fieldId)
    ], fieldModel, transformFieldName));
    return [
      {
        kind: TypePathKind.SharedSliceVariation,
        type: PrismicSpecialType.SharedSliceVariation,
        path: [sharedSliceModel.id, variation.id]
      },
      ...primary,
      ...items
    ];
  });
};

const serializePath = (path) => path.join(".");

const serializeTypePaths = (typePaths) => {
  return typePaths.map((typePath) => {
    return {
      ...typePath,
      path: serializePath(typePath.path)
    };
  });
};

var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _notifySubscribers, notifySubscribers_fn;
const createNodeId = (input) => input;
const createContentDigest = (_input) => "contentDigest is not supported during previews";
const createRuntime = (config = {}) => {
  return new Runtime(config);
};
class Runtime {
  constructor(config = {}) {
    __privateAdd(this, _notifySubscribers);
    var _a, _b, _c;
    this.nodes = [];
    this.typePaths = [];
    this.subscribers = [];
    this.config = {
      ...config,
      imageImgixParams: (_a = config.imageImgixParams) != null ? _a : DEFAULT_IMGIX_PARAMS,
      imagePlaceholderImgixParams: (_b = config.imagePlaceholderImgixParams) != null ? _b : DEFAULT_PLACEHOLDER_IMGIX_PARAMS,
      transformFieldName: (_c = config.transformFieldName) != null ? _c : (fieldName) => fieldName.replace(/-/g, "_")
    };
    this.nodeHelpers = nodeHelpers__namespace.createNodeHelpers({
      typePrefix: [GLOBAL_TYPE_PREFIX, config.typePrefix].filter(Boolean).join(" "),
      fieldPrefix: GLOBAL_TYPE_PREFIX,
      createNodeId,
      createContentDigest
    });
  }
  subscribe(callback) {
    this.subscribers = [...this.subscribers, callback];
  }
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((registeredCallback) => registeredCallback !== callback);
  }
  registerCustomTypeModel(model) {
    const typePaths = _function.pipe(customTypeModelToTypePaths(model, this.config.transformFieldName), serializeTypePaths);
    this.typePaths = [...this.typePaths, ...typePaths];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return typePaths;
  }
  registerCustomTypeModels(models) {
    const typePaths = _function.pipe(models.flatMap((model) => customTypeModelToTypePaths(model, this.config.transformFieldName)), serializeTypePaths);
    this.typePaths = [...this.typePaths, ...typePaths];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return typePaths;
  }
  registerSharedSliceModel(model) {
    const typePaths = _function.pipe(sharedSliceModelToTypePaths(model, this.config.transformFieldName), serializeTypePaths);
    this.typePaths = [...this.typePaths, ...typePaths];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return typePaths;
  }
  registerSharedSliceModels(models) {
    const typePaths = _function.pipe(models.flatMap((model) => sharedSliceModelToTypePaths(model, this.config.transformFieldName)), serializeTypePaths);
    this.typePaths = [...this.typePaths, ...typePaths];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return typePaths;
  }
  registerDocument(document) {
    const normalizedDocument = this.normalizeDocument(document);
    this.nodes = [...this.nodes, normalizedDocument];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return normalizedDocument;
  }
  registerDocuments(documents) {
    const nodes = documents.map((document) => {
      return this.normalizeDocument(document);
    });
    this.nodes = [...this.nodes, ...nodes];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return nodes;
  }
  normalizeDocument(document) {
    return this.normalize(document, [
      document.type
    ]);
  }
  normalize(value, path) {
    return normalize({
      value,
      path,
      getNode: this.getNode.bind(this),
      getTypePath: this.getTypePath.bind(this),
      nodeHelpers: this.nodeHelpers,
      linkResolver: this.config.linkResolver,
      htmlSerializer: this.config.htmlSerializer,
      imageImgixParams: this.config.imageImgixParams,
      imagePlaceholderImgixParams: this.config.imagePlaceholderImgixParams,
      transformFieldName: this.config.transformFieldName
    });
  }
  getNode(id) {
    return this.nodes.find((node) => node.prismicId === id);
  }
  hasNode(id) {
    return this.nodes.some((node) => node.prismicId === id);
  }
  getTypePath(path) {
    return this.typePaths.find((typePath) => typePath.path === serializePath(path));
  }
  exportTypePaths() {
    return JSON.stringify(this.typePaths);
  }
  importTypePaths(typePathsExport) {
    const importedTypePaths = JSON.parse(typePathsExport);
    this.typePaths = [...this.typePaths, ...importedTypePaths];
    __privateMethod(this, _notifySubscribers, notifySubscribers_fn).call(this);
    return importedTypePaths;
  }
}
_notifySubscribers = new WeakSet();
notifySubscribers_fn = function() {
  for (const subscriber of this.subscribers) {
    subscriber();
  }
};

const defaultTransformFieldName = (fieldName) => fieldName.replace(/-/g, "_");
const buildDependencies = async (gatsbyContext, pluginOptions) => {
  const prismicClient = prismic__namespace.createClient(pluginOptions.apiEndpoint, {
    fetch: pluginOptions.fetch,
    accessToken: pluginOptions.accessToken,
    routes: pluginOptions.routes,
    defaultParams: {
      lang: pluginOptions.lang,
      fetchLinks: pluginOptions.fetchLinks,
      graphQuery: pluginOptions.graphQuery,
      pageSize: pluginOptions.pageSize
    }
  });
  if (pluginOptions.releaseID) {
    prismicClient.queryContentFromReleaseByID(pluginOptions.releaseID);
  }
  const transformFieldName = pluginOptions.transformFieldName || defaultTransformFieldName;
  return {
    pluginOptions,
    prismicClient,
    webhookBody: gatsbyContext.webhookBody,
    createNode: gatsbyContext.actions.createNode,
    createTypes: gatsbyContext.actions.createTypes,
    touchNode: gatsbyContext.actions.touchNode,
    deleteNode: gatsbyContext.actions.deleteNode,
    createNodeId: gatsbyContext.createNodeId,
    createContentDigest: gatsbyContext.createContentDigest,
    reporter: gatsbyContext.reporter,
    reportInfo: gatsbyContext.reporter.info,
    reportWarning: gatsbyContext.reporter.warn,
    reportVerbose: gatsbyContext.reporter.verbose,
    buildUnionType: gatsbyContext.schema.buildUnionType,
    buildObjectType: gatsbyContext.schema.buildObjectType,
    buildEnumType: gatsbyContext.schema.buildEnumType,
    buildInterfaceType: gatsbyContext.schema.buildInterfaceType,
    buildScalarType: gatsbyContext.schema.buildScalarType,
    getNode: gatsbyContext.getNode,
    getNodes: gatsbyContext.getNodes,
    schema: gatsbyContext.schema,
    store: gatsbyContext.store,
    cache: gatsbyContext.cache,
    globalNodeHelpers: nodeHelpers.createNodeHelpers({
      typePrefix: GLOBAL_TYPE_PREFIX,
      createNodeId: gatsbyContext.createNodeId,
      createContentDigest: gatsbyContext.createContentDigest
    }),
    nodeHelpers: nodeHelpers.createNodeHelpers({
      typePrefix: [GLOBAL_TYPE_PREFIX, pluginOptions.typePrefix].filter(Boolean).join(" "),
      fieldPrefix: GLOBAL_TYPE_PREFIX,
      createNodeId: gatsbyContext.createNodeId,
      createContentDigest: gatsbyContext.createContentDigest
    }),
    createRemoteFileNode: pluginOptions.createRemoteFileNode || gatsbyFs__namespace.createRemoteFileNode,
    transformFieldName,
    runtime: createRuntime({
      typePrefix: GLOBAL_TYPE_PREFIX,
      linkResolver: pluginOptions.linkResolver,
      imageImgixParams: pluginOptions.imageImgixParams,
      imagePlaceholderImgixParams: pluginOptions.imagePlaceholderImgixParams,
      htmlSerializer: pluginOptions.htmlSerializer,
      transformFieldName
    })
  };
};

const GatsbyGraphQLTypeM = A__namespace.getMonoid();
const createBaseTypes = _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("baseTypes", () => _function.pipe([
  buildAlternateLanguageType,
  buildEmbedType,
  buildGeoPointType,
  buildImageDimensionsType,
  buildImageThumbnailType,
  buildLinkType,
  buildLinkTypeEnumType,
  buildSliceInterface,
  buildSharedSliceInterface,
  buildStructuredTextType,
  buildTypePathType
], RTE__namespace.sequenceArray)), RTE__namespace.bind("imgixTypes", () => buildImgixImageTypes), RTE__namespace.map((scope) => GatsbyGraphQLTypeM.concat(scope.baseTypes, scope.imgixTypes)), RTE__namespace.chain(createTypes), RTE__namespace.map(_function.constVoid));
const createCustomTypes = _function.pipe(RTE__namespace.asks((deps) => deps.pluginOptions.customTypeModels), RTE__namespace.map(A__namespace.map(createCustomType)), RTE__namespace.chain(RTE__namespace.sequenceArray), RTE__namespace.map((types) => types));
const createSharedSlices = _function.pipe(RTE__namespace.asks((deps) => deps.pluginOptions.sharedSliceModels), RTE__namespace.map(A__namespace.map(createSharedSlice)), RTE__namespace.chain(RTE__namespace.sequenceArray), RTE__namespace.map((types) => types));
const createTypePaths = _function.pipe(RTE__namespace.ask(), RTE__namespace.chainFirst((scope) => RTE__namespace.right(scope.runtime.registerCustomTypeModels(scope.pluginOptions.customTypeModels))), RTE__namespace.chainFirst((scope) => RTE__namespace.right(scope.runtime.registerSharedSliceModels(scope.pluginOptions.sharedSliceModels))), RTE__namespace.bind("typePaths", (scope) => RTE__namespace.right(scope.runtime.typePaths)), RTE__namespace.chainFirstW((scope) => _function.pipe(scope.typePaths, A__namespace.map(createTypePath), RTE__namespace.sequenceArray)), RTE__namespace.map(_function.constVoid));
const createSchemaCustomizationProgram = _function.pipe(RTE__namespace.ask(), RTE__namespace.chainFirst(() => createBaseTypes), RTE__namespace.chainFirst(() => createSharedSlices), RTE__namespace.bind("customTypeTypes", () => createCustomTypes), RTE__namespace.chainFirstW((scope) => createAllDocumentTypesType(scope.customTypeTypes)), RTE__namespace.chainFirst(() => createTypePaths), RTE__namespace.map(_function.constVoid));
const createSchemaCustomization = async (gatsbyContext, unpreparedPluginOptions) => {
  const pluginOptions = await preparePluginOptions(unpreparedPluginOptions);
  const dependencies = await buildDependencies(gatsbyContext, pluginOptions);
  return await _function.pipe(createSchemaCustomizationProgram(dependencies), TE__namespace.fold(throwError, () => T__namespace.of(void 0)))();
};

const pluginOptionsSchema = (args) => {
  const { Joi } = args;
  return Joi.object({
    repositoryName: Joi.string().required(),
    accessToken: Joi.string(),
    apiEndpoint: Joi.string(),
    customTypesApiToken: Joi.string(),
    customTypesApiEndpoint: Joi.string(),
    releaseID: Joi.string(),
    fetchLinks: Joi.array().items(Joi.string().required()),
    graphQuery: Joi.string(),
    lang: Joi.string(),
    pageSize: Joi.number(),
    linkResolver: Joi.function(),
    routes: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      path: Joi.string().required(),
      resolvers: Joi.object().pattern(Joi.string(), Joi.string().required())
    })),
    htmlSerializer: Joi.alternatives(Joi.object().pattern(Joi.allow(...Object.keys(prismicH__namespace.Element)), Joi.function()), Joi.function()),
    schemas: Joi.object(),
    customTypeModels: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      json: Joi.object().required()
    }).unknown()),
    sharedSliceModels: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      variations: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        primary: Joi.object(),
        items: Joi.object()
      }).unknown()).required()
    }).unknown()),
    imageImgixParams: Joi.object(),
    imagePlaceholderImgixParams: Joi.object(),
    typePrefix: Joi.string(),
    webhookSecret: Joi.string(),
    shouldDownloadFiles: Joi.alternatives(Joi.boolean(), Joi.function(), Joi.object().pattern(Joi.string(), Joi.alternatives(Joi.boolean(), Joi.function()))),
    createRemoteFileNode: Joi.function(),
    transformFieldName: Joi.function(),
    fetch: Joi.function()
  }).or("customTypesApiToken", "customTypeModels", "schemas").oxor("fetchLinks", "graphQuery").external(async (unpreparedPluginOptions) => {
    const endpoint = unpreparedPluginOptions.apiEndpoint || prismic__namespace.getEndpoint(unpreparedPluginOptions.repositoryName);
    const client = prismic__namespace.createClient(endpoint, {
      fetch: unpreparedPluginOptions.fetch || fetch__default["default"],
      accessToken: unpreparedPluginOptions.accessToken
    });
    if (unpreparedPluginOptions.releaseID) {
      client.queryContentFromReleaseByID(unpreparedPluginOptions.releaseID);
    }
    let repository;
    try {
      repository = await client.getRepository();
      await client.get({ pageSize: 1 });
    } catch (error) {
      if (error instanceof Error) {
        let message = sprintf(REPORTER_TEMPLATE, unpreparedPluginOptions.repositoryName, error.message);
        if (error instanceof prismic__namespace.ForbiddenError || prismic__namespace.PrismicError) {
          message = sprintf(REPORTER_TEMPLATE, unpreparedPluginOptions.repositoryName, unpreparedPluginOptions.accessToken ? FORBIDDEN_ACCESS_WITH_ACCESS_TOKEN : FORBIDDEN_ACCESS_WITHOUT_ACCESS_TOKEN);
        }
        if (unpreparedPluginOptions.releaseID && /ref could not be found/i.test(error.message)) {
          message = sprintf(REPORTER_TEMPLATE, unpreparedPluginOptions.repositoryName, unpreparedPluginOptions.accessToken ? sprintf(NON_EXISTENT_RELEASE_WITH_ACCESS_TOKEN_MSG, unpreparedPluginOptions.releaseID) : sprintf(NON_EXISTENT_RELEASE_WITHOUT_ACCESS_TOKEN_MSG, unpreparedPluginOptions.releaseID));
        }
        throw new Joi.ValidationError(message, [{ message }], error.name);
      }
    }
    if (unpreparedPluginOptions.customTypesApiToken) {
      const customTypesClient = prismicCustomTypes__namespace.createClient({
        repositoryName: unpreparedPluginOptions.repositoryName,
        endpoint: unpreparedPluginOptions.customTypesApiEndpoint,
        token: unpreparedPluginOptions.customTypesApiToken,
        fetch: unpreparedPluginOptions.fetch || fetch__default["default"]
      });
      try {
        await customTypesClient.getAll();
      } catch (error) {
        if (error instanceof Error) {
          let message = sprintf(REPORTER_TEMPLATE, unpreparedPluginOptions.repositoryName, error.message);
          if (error instanceof prismicCustomTypes__namespace.ForbiddenError) {
            message = sprintf(REPORTER_TEMPLATE, unpreparedPluginOptions.repositoryName, FORBIDDEN_CUSTOM_TYPES_API_ACCESS);
          }
          throw new Joi.ValidationError(message, [{ message }], error.name);
        }
      }
    }
    if (!unpreparedPluginOptions.customTypesApiToken) {
      const pluginOptions = await preparePluginOptions(unpreparedPluginOptions);
      if (repository) {
        const missingCustomTypeIds = Object.keys(repository.types).filter((customTypeId) => {
          return !pluginOptions.customTypeModels.some((customTypeModel) => customTypeModel.id === customTypeId);
        });
        if (missingCustomTypeIds.length > 0) {
          throw new Joi.ValidationError(MISSING_SCHEMAS_MSG, missingCustomTypeIds.map((id) => ({
            message: sprintf(REPORTER_TEMPLATE, pluginOptions.repositoryName, sprintf(MISSING_SCHEMA_MSG, id))
          })), pluginOptions.customTypeModels.map((customTypeModel) => customTypeModel.id));
        }
      }
    }
  });
};

const createGloballyUniqueNodeOfType = (record, type) => RTE__namespace.asks((deps) => _function.pipe(record, deps.nodeHelpers.createNodeFactory(type, { idIsGloballyUnique: true }), I__namespace.chainFirst(deps.createNode)));

const createGloballyUniqueNode = (record) => createGloballyUniqueNodeOfType(record, record.type);

const createGloballyUniqueNodes = _function.flow(A__namespace.map(createGloballyUniqueNode), RTE__namespace.sequenceArray);

const getTypePath = (kind, path) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("nodeId", (scope) => RTE__namespace.right(scope.nodeHelpers.createNodeId(["TypePathType", serializePath(path)]))), RTE__namespace.chain((scope) => RTE__namespace.fromIO(() => scope.getNode(scope.nodeId))), RTE__namespace.filterOrElse((result) => result != null, () => new Error(`Could not find a "${kind}" type path for path: "${dotPath(path)}"`)));

const shouldDownloadFile = (config) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bindW("predicate", (scope) => {
  const { shouldDownloadFiles } = scope.pluginOptions;
  const fieldPath = dotPath(config.path);
  switch (typeof shouldDownloadFiles) {
    case "boolean": {
      return RTE__namespace.right(() => shouldDownloadFiles);
    }
    case "function": {
      return RTE__namespace.right(shouldDownloadFiles);
    }
    case "object": {
      const fieldPredicate = shouldDownloadFiles[fieldPath];
      if (fieldPredicate) {
        if (typeof fieldPredicate === "boolean") {
          return RTE__namespace.right(() => fieldPredicate);
        } else if (typeof fieldPredicate === "function") {
          return RTE__namespace.right(fieldPredicate);
        }
      }
    }
  }
  return RTE__namespace.right(() => false);
}), RTE__namespace.map((scope) => scope.predicate(config.field)));

const getFromCache = (key) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => RTE__namespace.fromTask(() => deps.cache.get(key))), RTE__namespace.chainW(RTE__namespace.fromPredicate((result) => result != null, () => new Error("Cache does not contain a value for the given key"))));

const setToCache = (key) => (value) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => RTE__namespace.fromTask(() => deps.cache.set(key, value))), RTE__namespace.map(() => value));

const getFromOrSetToCache = (key, f) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain(() => getFromCache(key)), RTE__namespace.orElse(() => _function.pipe(f, RTE__namespace.chainFirstW(setToCache(key)))));

const touchNode = (node) => RTE__namespace.asks((deps) => deps.touchNode(node));

const reportVerbose = (text) => RTE__namespace.asks((deps) => _function.pipe(sprintf(REPORTER_TEMPLATE, deps.pluginOptions.repositoryName, text), deps.reportVerbose));

const createRemoteFileNode = (config) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("attemptDownload", () => shouldDownloadFile({
  path: config.path,
  field: config.field
})), RTE__namespace.chainFirst((scope) => scope.attemptDownload ? reportVerbose(`Attempting to download and cache file: ${config.url}`) : RTE__namespace.right(void 0)), RTE__namespace.chain((scope) => getFromOrSetToCache(`file-node-${config.url}`, RTE__namespace.fromTaskEither(TE__namespace.tryCatch(() => scope.attemptDownload ? scope.createRemoteFileNode({
  url: config.url,
  store: scope.store,
  cache: scope.cache,
  createNode: scope.createNode,
  createNodeId: scope.createNodeId,
  reporter: scope.reporter
}) : Promise.resolve(null), (e) => e)))), RTE__namespace.chainFirst((node) => node ? touchNode(node) : RTE__namespace.right(null)));

const removeURLParameter = (url, paramKey) => {
  const instance = new URL(url);
  instance.searchParams.delete(paramKey);
  return instance.toString();
};

const unknownRecordRefinement = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const unknownRecordArrayValueRefinement = (value) => Array.isArray(value) && value.every(unknownRecordRefinement);
const documentRefinement$1 = (value) => unknownRecordRefinement(value) && "first_publication_date" in value;
const embedValueRefinement = (value) => unknownRecordRefinement(value) && "embed_url" in value;
const sliceValueRefinement = (value) => unknownRecordRefinement(value) && "slice_type" in value;
const sharedSliceValueRefinement = (value) => sliceValueRefinement(value) && "variation" in value;
const slicesValueRefinement = (value) => Array.isArray(value) && value.every(sliceValueRefinement);
const stringableRefinement = (value) => (typeof value === "boolean" || typeof value === "number" || typeof value === "bigint" || typeof value === "string" || typeof value === "symbol" || typeof value === "function" || typeof value === "object") && value != null && Boolean(value.toString);
const linkValueRefinement = (value) => {
  return typeof value === "object" && (value === null || "link_type" in value);
};
const imageValueRefinement = (value) => {
  return typeof value === "object" && value !== null;
};
const normalizeDocumentRecord = (kind, path, value) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(value, mapRecordIndices(deps.transformFieldName), R__namespace.mapWithIndex((prop, propValue) => normalizeDocumentSubtree(kind, [...path, prop], propValue)), R__namespace.sequence(RTE__namespace.ApplicativeSeq))));
const normalizeDocumentSubtree = (kind, path, value) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bind("typePath", () => getTypePath(kind, path)), RTE__namespace.bind("type", (env) => RTE__namespace.right(env.typePath.type)), RTE__namespace.chain((env) => {
  switch (env.typePath.type) {
    case PrismicSpecialType.Document: {
      return _function.pipe(value, RTE__namespace.fromPredicate(documentRefinement$1, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bind("dataField", (scope) => !R__namespace.isEmpty(scope.value.data) ? normalizeDocumentRecord(TypePathKind.CustomType, [...path, "data"], scope.value.data) : RTE__namespace.right(void 0)), RTE__namespace.chainW((scope) => RTE__namespace.right({
        ...scope.value,
        data: scope.dataField
      })));
    }
    case PrismicSpecialType.DocumentData: {
      return _function.pipe(value, RTE__namespace.fromPredicate(unknownRecordRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.chainW((value2) => normalizeDocumentRecord(TypePathKind.Field, path, value2)));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Group: {
      return _function.pipe(value, RTE__namespace.fromPredicate(unknownRecordArrayValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.map(A__namespace.map((item) => normalizeDocumentRecord(TypePathKind.Field, path, item))), RTE__namespace.chainW(RTE__namespace.sequenceArray));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Slices: {
      return _function.pipe(value, RTE__namespace.fromPredicate(slicesValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.map(A__namespace.map((item) => sharedSliceValueRefinement(item) ? normalizeDocumentSubtree(TypePathKind.SharedSliceVariation, [item.slice_type, item.variation], item) : normalizeDocumentSubtree(TypePathKind.Field, [...path, item.slice_type], item))), RTE__namespace.chainW(RTE__namespace.sequenceArray));
    }
    case prismicT__namespace.CustomTypeModelSliceType.Slice: {
      return _function.pipe(value, RTE__namespace.fromPredicate(sliceValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bindW("primary", (scope) => normalizeDocumentRecord(TypePathKind.Field, [...path, "primary"], scope.value.primary)), RTE__namespace.bindW("items", (scope) => _function.pipe(scope.value.items, A__namespace.map((item) => normalizeDocumentRecord(TypePathKind.Field, [...path, "items"], item)), RTE__namespace.sequenceArray)), RTE__namespace.map((scope) => ({
        ...scope.value,
        primary: scope.primary,
        items: scope.items
      })));
    }
    case PrismicSpecialType.SharedSliceVariation: {
      return _function.pipe(value, RTE__namespace.fromPredicate(sharedSliceValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bindW("primary", (scope) => normalizeDocumentRecord(TypePathKind.Field, [...path, "primary"], scope.value.primary)), RTE__namespace.bindW("items", (scope) => _function.pipe(scope.value.items, A__namespace.map((item) => normalizeDocumentRecord(TypePathKind.Field, [...path, "items"], item)), RTE__namespace.sequenceArray)), RTE__namespace.map((scope) => ({
        ...scope.value,
        primary: scope.primary,
        items: scope.items
      })));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Embed: {
      return _function.pipe(value, RTE__namespace.fromPredicate(embedValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bind("id", (scope) => _function.pipe(R__namespace.lookup("embed_url", scope.value), RTE__namespace.fromOption(() => new Error("Embed URL field does not exist")), RTE__namespace.filterOrElse((url) => typeof url === "string", () => new Error("Embed URL field is not a string")), RTE__namespace.map(env.nodeHelpers.createNodeId))), RTE__namespace.chainW((scope) => createNodeOfType({ ...scope.value, id: scope.id }, "EmbedType")), RTE__namespace.map((node) => node), RTE__namespace.orElseW(() => RTE__namespace.right(null)));
    }
    case prismicT__namespace.CustomTypeModelFieldType.IntegrationFields: {
      return _function.pipe(value, RTE__namespace.fromPredicate(unknownRecordRefinement, () => new Error("Field value is not a plain object")), RTE__namespace.bindTo("value"), RTE__namespace.bind("id", (scope) => _function.pipe(scope.value, R__namespace.lookup("id"), O__namespace.filter(stringableRefinement), O__namespace.getOrElseW(() => env.createContentDigest(scope.value)), (id) => RTE__namespace.right(id))), RTE__namespace.chainW((scope) => createNodeOfType({ ...scope.value, id: scope.id }, [
        ...path,
        "IntegrationType"
      ])), RTE__namespace.map((node) => node.id));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Link: {
      return _function.pipe(value, RTE__namespace.fromPredicate(linkValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bind("fileNode", (scope) => {
        return scope.value.link_type == prismicT__namespace.LinkType.Media && "url" in scope.value && scope.value.url ? createRemoteFileNode({
          url: scope.value.url,
          path,
          field: scope.value
        }) : RTE__namespace.right(null);
      }), RTE__namespace.map((scope) => {
        var _a;
        return {
          ...scope.value,
          localFile: ((_a = scope.fileNode) == null ? void 0 : _a.id) || null
        };
      }));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Image: {
      return _function.pipe(value, RTE__namespace.fromPredicate(imageValueRefinement, () => new Error(`Field value does not match the type declared in its type path: ${env.type}`)), RTE__namespace.bindTo("value"), RTE__namespace.bind("thumbnails", (scope) => _function.pipe(scope.value, R__namespace.filterWithIndex((key) => !PRISMIC_API_IMAGE_FIELDS.includes(key)), RTE__namespace.right, RTE__namespace.bindTo("thumbnails"), RTE__namespace.bind("thumbnailFileNodes", (thumbnailsScope) => _function.pipe(thumbnailsScope.thumbnails, R__namespace.mapWithIndex((thumbnailName, thumbnail) => thumbnail.url ? createRemoteFileNode({
        url: removeURLParameter(thumbnail.url, "auto"),
        path: [...path, thumbnailName],
        field: thumbnail
      }) : RTE__namespace.right(null)), R__namespace.sequence(RTE__namespace.ApplicativeSeq))), RTE__namespace.map((scope2) => _function.pipe(scope2.thumbnails, R__namespace.mapWithIndex((key, value2) => {
        var _a;
        return {
          ...value2,
          localFile: ((_a = scope2.thumbnailFileNodes[key]) == null ? void 0 : _a.id) || null
        };
      }))))), RTE__namespace.bind("fileNode", (scope) => {
        return scope.value.url ? createRemoteFileNode({
          url: removeURLParameter(scope.value.url, "auto"),
          path,
          field: scope.value
        }) : RTE__namespace.right(null);
      }), RTE__namespace.map((scope) => {
        var _a;
        return {
          ...scope.value,
          ...scope.thumbnails,
          localFile: ((_a = scope.fileNode) == null ? void 0 : _a.id) || null
        };
      }));
    }
    case prismicT__namespace.CustomTypeModelFieldType.Boolean:
    case prismicT__namespace.CustomTypeModelFieldType.Color:
    case prismicT__namespace.CustomTypeModelFieldType.Date:
    case prismicT__namespace.CustomTypeModelFieldType.GeoPoint:
    case prismicT__namespace.CustomTypeModelFieldType.Number:
    case prismicT__namespace.CustomTypeModelFieldType.Select:
    case prismicT__namespace.CustomTypeModelFieldType.StructuredText:
    case prismicT__namespace.CustomTypeModelFieldType.Text:
    case prismicT__namespace.CustomTypeModelFieldType.Timestamp:
    case prismicT__namespace.CustomTypeModelFieldType.UID:
    case PrismicSpecialType.Unknown:
    default: {
      return RTE__namespace.throwError(new Error("Normalization not necessary for this value."));
    }
  }
}), RTE__namespace.orElse(() => RTE__namespace.right(value)));

const documentRefinement = (value) => typeof value === "object" && value !== null && !Array.isArray(value) && "id" in value && "type" in value;
const normalizeDocument = (doc) => _function.pipe(normalizeDocumentSubtree(TypePathKind.CustomType, [doc.type], doc), RTE__namespace.chainW(RTE__namespace.fromPredicate(documentRefinement, () => new Error("Document shape is no longer a Document after normalization"))));

const normalizeDocuments = _function.flow(A__namespace.map(normalizeDocument), RTE__namespace.sequenceArray);

const queryAllDocuments = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((env) => RTE__namespace.fromTask(() => env.prismicClient.dangerouslyGetAll({
  pageSize: env.pluginOptions.pageSize
}))));

const sourceNodesForAllDocuments = _function.pipe(queryAllDocuments, RTE__namespace.chainW(normalizeDocuments), RTE__namespace.chainW((docs) => createGloballyUniqueNodes(docs)), RTE__namespace.map(_function.constVoid));

const isPrismicURL = (url) => /^https?:\/\/([^.]+)\.(wroom\.(?:test|io)|prismic\.io)\/api\/?/.test(url);

const isPrismicWebhookBody = (webhookBody) => typeof webhookBody === "object" && typeof webhookBody.apiUrl === "string" && isPrismicURL(webhookBody.apiUrl);

const isPrismicWebhookBodyApiUpdate = (webhookBody) => isPrismicWebhookBody(webhookBody) && webhookBody.type === PrismicWebhookType.APIUpdate;

const isPrismicWebhookBodyForRepository = (repositoryName) => (webhookBody) => isPrismicWebhookBody(webhookBody) && webhookBody.domain === repositoryName;

const isPrismicWebhookBodyTestTrigger = (webhookBody) => isPrismicWebhookBody(webhookBody) && webhookBody.type === PrismicWebhookType.TestTrigger;

const isValidWebhookSecret = (secret) => (webhookBody) => secret ? webhookBody.secret === secret : true;

const reportWarning = (text) => RTE__namespace.asks((deps) => _function.pipe(sprintf(REPORTER_TEMPLATE, deps.pluginOptions.repositoryName, text), deps.reportWarning));

const getNode = (nodeId) => RTE__namespace.asks((deps) => deps.getNode(nodeId));

const getNodes = _function.flow(A__namespace.map(getNode), RTE__namespace.sequenceArray);

const deleteNode = (node) => RTE__namespace.asks((deps) => deps.deleteNode(node));

const deleteNodes = _function.flow(A__namespace.map(deleteNode), RTE__namespace.sequenceArray);

const deleteNodesForDocumentIds = (documentIds) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(documentIds, A__namespace.map(deps.nodeHelpers.createNodeId), getNodes, RTE__namespace.map((nodes) => _function.pipe(nodes, A__namespace.filter((node) => node != null))), RTE__namespace.chain((nodes) => deleteNodes(nodes)), RTE__namespace.map(_function.constVoid))));

const queryDocumentsByIds = (ids) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((env) => RTE__namespace.fromTask(() => env.prismicClient.getAllByIDs(ids, {
  pageSize: env.pluginOptions.pageSize
}))));

const sourceNodesForDocumentIds = (documentIds) => _function.pipe(queryDocumentsByIds(documentIds), RTE__namespace.chainW(normalizeDocuments), RTE__namespace.chainW((docs) => createGloballyUniqueNodes(docs)), RTE__namespace.map(_function.constVoid));

const getAllNodes = () => RTE__namespace.asks((deps) => deps.getNodes());

const touchNodes = _function.flow(A__namespace.map(touchNode), RTE__namespace.sequenceArray);

const touchAllNodes = (config = { exceptPrismicIds: [] }) => _function.pipe(getAllNodes(), RTE__namespace.map(A__namespace.filter((node) => node.internal.owner === PLUGIN_NAME)), RTE__namespace.map(A__namespace.filter((node) => !config.exceptPrismicIds.includes(node.prismicId))), RTE__namespace.chain(touchNodes), RTE__namespace.map(_function.constVoid));

const extractApiUpdateWebhookBodyDocumentIds = (webhookBody) => _function.pipe(RTE__namespace.ask(), RTE__namespace.bindW("documentIds", () => RTE__namespace.right(webhookBody.documents)), RTE__namespace.bindW("releaseDocumentIds", (scope) => _function.pipe([
  ...webhookBody.releases.update || [],
  ...webhookBody.releases.addition || [],
  ...webhookBody.releases.deletion || []
], A__namespace.filter((payload) => payload.id === scope.pluginOptions.releaseID), A__namespace.chain((payload) => payload.documents), RTE__namespace.right)), RTE__namespace.map((scope) => [
  ...new Set([...scope.documentIds, ...scope.releaseDocumentIds])
]));
const onWebhookApiUpdate = (webhookBody) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chainFirst(() => reportInfo("Received API update webhook. Processing changes.")), RTE__namespace.bind("documentIds", () => extractApiUpdateWebhookBodyDocumentIds(webhookBody)), RTE__namespace.bind("documentsToUpdate", (scope) => queryDocumentsByIds(scope.documentIds)), RTE__namespace.bind("documentIdsToUpdate", (scope) => _function.pipe(scope.documentsToUpdate, A__namespace.map((document) => document.id), (ids) => RTE__namespace.right(ids))), RTE__namespace.bind("documentIdsToDelete", (scope) => _function.pipe(scope.documentIds, A__namespace.difference(s__namespace.Eq)(scope.documentIdsToUpdate), (ids) => RTE__namespace.right(ids))), RTE__namespace.chainFirstW((scope) => reportInfo(`Adding or updating the following Prismic documents: [${scope.documentIdsToUpdate.map((id) => `"${id}"`).join(", ")}]`)), RTE__namespace.chainFirstW((scope) => reportInfo(`Deleting the following Prismic documents: [${scope.documentIdsToDelete.map((id) => `"${id}"`).join(", ")}]`)), RTE__namespace.chainFirstW((scope) => deleteNodesForDocumentIds(scope.documentIdsToDelete)), RTE__namespace.chainFirstW((scope) => sourceNodesForDocumentIds(scope.documentIdsToUpdate)), RTE__namespace.chainFirstW((scope) => touchAllNodes({
  exceptPrismicIds: scope.documentIdsToDelete
})), RTE__namespace.map(_function.constVoid));

const onWebhookTestTrigger = _function.pipe(reportInfo(WEBHOOK_TEST_TRIGGER_SUCCESS_MSG), RTE__namespace.chainFirstW(() => touchAllNodes()));

const onPrismicWebhook = (webhookBody) => _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(webhookBody, O__namespace.fromPredicate(isValidWebhookSecret(deps.pluginOptions.webhookSecret)), O__namespace.fold(() => reportWarning(WEBHOOK_SECRET_MISMATCH_MSG), (webhookBody2) => {
  if (isPrismicWebhookBodyApiUpdate(webhookBody2)) {
    return onWebhookApiUpdate(webhookBody2);
  }
  if (isPrismicWebhookBodyTestTrigger(webhookBody2)) {
    return onWebhookTestTrigger;
  }
  return RTE__namespace.right(void 0);
}))));
const onWebhook = _function.pipe(RTE__namespace.ask(), RTE__namespace.chain((deps) => _function.pipe(deps.webhookBody, O__namespace.fromPredicate(isPrismicWebhookBodyForRepository(deps.pluginOptions.repositoryName)), O__namespace.fold(() => RTE__namespace.right(void 0), onPrismicWebhook))));

const sourceNodesProgram = _function.pipe(RTE__namespace.ask(), RTE__namespace.chainW(RTE__namespace.fromPredicate((deps) => Boolean(deps.webhookBody && JSON.stringify(deps.webhookBody) !== "{}"), _function.constVoid)), RTE__namespace.fold(() => sourceNodesForAllDocuments, () => onWebhook));
const sourceNodes = async (gatsbyContext, unpreparedPluginOptions) => {
  const pluginOptions = await preparePluginOptions(unpreparedPluginOptions);
  const dependencies = await buildDependencies(gatsbyContext, pluginOptions);
  return await _function.pipe(sourceNodesProgram(dependencies), TE__namespace.fold(throwError, () => T__namespace.of(void 0)))();
};

exports.createSchemaCustomization = createSchemaCustomization;
exports.pluginOptionsSchema = pluginOptionsSchema;
exports.sourceNodes = sourceNodes;
//# sourceMappingURL=gatsby-node.cjs.map
