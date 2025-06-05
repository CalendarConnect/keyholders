/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as applications from "../applications.js";
import type * as automations from "../automations.js";
import type * as clients from "../clients.js";
import type * as contact from "../contact.js";
import type * as credits from "../credits.js";
import type * as executions from "../executions.js";
import type * as http from "../http.js";
import type * as internal_ from "../internal.js";
import type * as linkedout from "../linkedout.js";
import type * as n8nWorkflowMutations from "../n8nWorkflowMutations.js";
import type * as n8nWorkflowQueries from "../n8nWorkflowQueries.js";
import type * as n8nWorkflows from "../n8nWorkflows.js";
import type * as settings from "../settings.js";
import type * as subscriptions from "../subscriptions.js";
import type * as templates from "../templates.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  applications: typeof applications;
  automations: typeof automations;
  clients: typeof clients;
  contact: typeof contact;
  credits: typeof credits;
  executions: typeof executions;
  http: typeof http;
  internal: typeof internal_;
  linkedout: typeof linkedout;
  n8nWorkflowMutations: typeof n8nWorkflowMutations;
  n8nWorkflowQueries: typeof n8nWorkflowQueries;
  n8nWorkflows: typeof n8nWorkflows;
  settings: typeof settings;
  subscriptions: typeof subscriptions;
  templates: typeof templates;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
