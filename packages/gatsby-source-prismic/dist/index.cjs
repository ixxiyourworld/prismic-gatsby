'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nodeHelpers = require('gatsby-node-helpers');
const _function = require('fp-ts/function');
const prismicT = require('@prismicio/types');
const prismicH = require('@prismicio/helpers');
const imgixGatsbyHelpers = require('@imgix/gatsby/dist/pluginHelpers.browser');
const O = require('fp-ts/Option');

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

const nodeHelpers__namespace = /*#__PURE__*/_interopNamespace(nodeHelpers);
const prismicT__namespace = /*#__PURE__*/_interopNamespace(prismicT);
const prismicH__namespace = /*#__PURE__*/_interopNamespace(prismicH);
const imgixGatsbyHelpers__namespace = /*#__PURE__*/_interopNamespace(imgixGatsbyHelpers);
const O__namespace = /*#__PURE__*/_interopNamespace(O);

exports.TypePathKind = void 0;
(function(TypePathKind2) {
  TypePathKind2["CustomType"] = "CustomType";
  TypePathKind2["SharedSliceVariation"] = "SharedSliceVariation";
  TypePathKind2["Field"] = "Field";
})(exports.TypePathKind || (exports.TypePathKind = {}));
exports.PrismicSpecialType = void 0;
(function(PrismicSpecialType2) {
  PrismicSpecialType2["Document"] = "Document";
  PrismicSpecialType2["DocumentData"] = "DocumentData";
  PrismicSpecialType2["SharedSliceVariation"] = "SharedSliceVariation";
  PrismicSpecialType2["Unknown"] = "Unknown";
})(exports.PrismicSpecialType || (exports.PrismicSpecialType = {}));
exports.PrismicWebhookType = void 0;
(function(PrismicWebhookType2) {
  PrismicWebhookType2["APIUpdate"] = "api-update";
  PrismicWebhookType2["TestTrigger"] = "test-trigger";
})(exports.PrismicWebhookType || (exports.PrismicWebhookType = {}));

const PLUGIN_NAME = "gatsby-source-prismic";
const GLOBAL_TYPE_PREFIX = "Prismic";
const DEFAULT_CUSTOM_TYPES_API_ENDPOINT = "https://customtypes.prismic.io/customtypes";
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

const sanitizeImageURL = (url) => decodeURIComponent(url.replace(/\+/g, " "));

const stripURLQueryParameters = (url) => _function.pipe(O__namespace.tryCatch(() => new URL(url)), O__namespace.map((instance) => `${instance.origin}${instance.pathname}`), O__namespace.getOrElse(() => url));

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
    case exports.PrismicSpecialType.Document: {
      assertType(exports.PrismicSpecialType.Document, isDocument, config.value);
      return document({
        ...config,
        value: config.value
      });
    }
    case exports.PrismicSpecialType.DocumentData: {
      assertType(exports.PrismicSpecialType.DocumentData, isDocumentDataField, config.value);
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
    case exports.PrismicSpecialType.SharedSliceVariation: {
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
      return [{ kind: exports.TypePathKind.Field, type: model.type, path }, ...fields];
    }
    case prismicT__namespace.CustomTypeModelFieldType.Slices: {
      const choices = (model.config.choices && Object.entries(model.config.choices) || []).filter((entry) => entry[1].type === prismicT__namespace.CustomTypeModelSliceType.Slice).flatMap(([choiceId, choiceModel]) => fieldToTypePaths([...path, choiceId], choiceModel, transformFieldName));
      return [{ kind: exports.TypePathKind.Field, type: model.type, path }, ...choices];
    }
    case prismicT__namespace.CustomTypeModelSliceType.Slice: {
      const primary = Object.entries(model["non-repeat"] || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([...path, "primary", transformFieldName(fieldId)], fieldModel, transformFieldName));
      const items = Object.entries(model.repeat || {}).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([...path, "items", transformFieldName(fieldId)], fieldModel, transformFieldName));
      return [
        { kind: exports.TypePathKind.Field, type: model.type, path },
        ...primary,
        ...items
      ];
    }
    default: {
      return [
        {
          kind: exports.TypePathKind.Field,
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
    kind: exports.TypePathKind.CustomType,
    type: exports.PrismicSpecialType.Document,
    path: [customTypeModel.id]
  };
  if (hasDataFields) {
    const data = Object.entries(fieldModels).flatMap(([fieldId, fieldModel]) => fieldToTypePaths([customTypeModel.id, "data", transformFieldName(fieldId)], fieldModel, transformFieldName));
    return [
      documentTypePath,
      {
        kind: exports.TypePathKind.Field,
        type: exports.PrismicSpecialType.DocumentData,
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
        kind: exports.TypePathKind.SharedSliceVariation,
        type: exports.PrismicSpecialType.SharedSliceVariation,
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

exports.DEFAULT_CUSTOM_TYPES_API_ENDPOINT = DEFAULT_CUSTOM_TYPES_API_ENDPOINT;
exports.DEFAULT_IMGIX_PARAMS = DEFAULT_IMGIX_PARAMS;
exports.DEFAULT_LANG = DEFAULT_LANG;
exports.DEFAULT_PLACEHOLDER_IMGIX_PARAMS = DEFAULT_PLACEHOLDER_IMGIX_PARAMS;
exports.FORBIDDEN_ACCESS_WITHOUT_ACCESS_TOKEN = FORBIDDEN_ACCESS_WITHOUT_ACCESS_TOKEN;
exports.FORBIDDEN_ACCESS_WITH_ACCESS_TOKEN = FORBIDDEN_ACCESS_WITH_ACCESS_TOKEN;
exports.FORBIDDEN_CUSTOM_TYPES_API_ACCESS = FORBIDDEN_CUSTOM_TYPES_API_ACCESS;
exports.GLOBAL_TYPE_PREFIX = GLOBAL_TYPE_PREFIX;
exports.MISSING_SCHEMAS_MSG = MISSING_SCHEMAS_MSG;
exports.MISSING_SCHEMA_MSG = MISSING_SCHEMA_MSG;
exports.NON_EXISTENT_RELEASE_WITHOUT_ACCESS_TOKEN_MSG = NON_EXISTENT_RELEASE_WITHOUT_ACCESS_TOKEN_MSG;
exports.NON_EXISTENT_RELEASE_WITH_ACCESS_TOKEN_MSG = NON_EXISTENT_RELEASE_WITH_ACCESS_TOKEN_MSG;
exports.PLUGIN_NAME = PLUGIN_NAME;
exports.PREVIEWABLE_NODE_ID_FIELD = PREVIEWABLE_NODE_ID_FIELD;
exports.PRISMIC_API_IMAGE_FIELDS = PRISMIC_API_IMAGE_FIELDS;
exports.REPORTER_TEMPLATE = REPORTER_TEMPLATE;
exports.Runtime = Runtime;
exports.WEBHOOK_SECRET_MISMATCH_MSG = WEBHOOK_SECRET_MISMATCH_MSG;
exports.WEBHOOK_TEST_TRIGGER_SUCCESS_MSG = WEBHOOK_TEST_TRIGGER_SUCCESS_MSG;
exports.createRuntime = createRuntime;
//# sourceMappingURL=index.cjs.map
