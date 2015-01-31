/**
 * Created by raul on 9/23/14.
 */

/// <reference path="../../definitions/handlebars/handlebars.d.ts" />

interface HandlebarsStatic {
    templates: {
        [s: string]: (model: any) => string;
    }
}