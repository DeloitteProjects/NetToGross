/**
 * Net To Gross LWC
 *
 * @author Ajet Keta (aketa@deloittece.com)
 * @created 10/10/2022
 */

import { LightningElement } from "lwc";
import getCurrentlyLoggedInUsersCountryCode from "@salesforce/apex/CTRL_NetToGross.getCurrentlyLoggedInUsersCountryCode";
import x_api_key from "@salesforce/label/c.x_api_key";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class NetToGross extends LightningElement {
  inputValue;
  submitButton;
  countryCode;
  grossValueFound = false;
  grossValue;
  url = "https://api.vatstack.com/v1/rates?";
  params = [];

  async renderedCallback() {
    if (!this.grossValueFound && !this.errorFound) {
      try {
        this.countryCode = await getCurrentlyLoggedInUsersCountryCode();
      } catch (err) {
        this.dispatchEvent("Error", err.message, "error");
      }
      this.params.push({
        parameterName: "country_code",
        parameterValue: this.countryCode.toUpperCase()
      });
      this.inputValue = this.template.querySelector(".netvalue");
    }
  }

  async netToGross() {
    try {
      let netValue = parseFloat(this.inputValue.value);
      if (!netValue) throw new Error("Net Value can not be empty!");

      let jsonResponse = await this.getRateApiResponse(this.url, this.params);

      this.grossValue =
        (netValue / (1 - jsonResponse.rates[0].standard_rate / 100)).toFixed(
          2
        ) + ` ${jsonResponse.rates[0].currency}`;
      this.grossValueFound = true;
    } catch (err) {
      this.showToast("Error", err.message, "error");
    }
  }

  async getRateApiResponse(url, params) {
    url = this.concatenateParams2Url(url, params);

    try {
      const response = await fetch(url, {
        headers: {
          "x-api-key": x_api_key
        }
      });
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  concatenateParams2Url(url, params) {
    for (let param of params) {
      url = url.concat(param.parameterName + "=" + param.parameterValue + "&");
    }

    return url.slice(0, url.length - 1);
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });

    this.dispatchEvent(event);
  }
}
