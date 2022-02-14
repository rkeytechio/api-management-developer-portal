﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { CustomWidgetModel } from "./customWidgetModel";
import { sizeStylesInitial } from "./ko/constants";
import { CustomWidgetConfiguration } from "./customWidgetConfiguration";
import { StyleHelper } from "@paperbits/styles";

export class CustomWidgetHandlers implements IWidgetHandler {
    constructor(private readonly configuration: CustomWidgetConfiguration) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: this.configuration.name,
            displayName: this.configuration.displayName,
            category: this.configuration.category,
            requires: [],

            createModel: async () => {
                const model = new CustomWidgetModel();
                model.name = this.configuration.name;
                model.uri = this.configuration.uri;
                model.customInputValue = this.configuration.customInputValue ?? "{}";
                StyleHelper.setPluginConfigForLocalStyles(model.styles, "size", sizeStylesInitial);

                model.widgetDisplayName = this.configuration.displayName;
                return model;
            }
        };

        if (this.configuration.iconUrl) widgetOrder.iconUrl = this.configuration.iconUrl;
        else widgetOrder.iconClass = "widget-icon widget-icon-api-management";

        return widgetOrder;
    }
}