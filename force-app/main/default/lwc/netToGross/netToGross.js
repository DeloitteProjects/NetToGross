/**
 * Net To Gross LWC
 *
 * @author Ajet Keta (aketa@deloittece.com)
 * @created 10/10/2022
 */

import { LightningElement } from 'lwc';
import getCurrentlyLoggedInUsersCountryCode from '@salesforce/apex/CTRL_NetToGross.getCurrentlyLoggedInUsersCountryCode';
import x_api_key from '@salesforce/label/c.x_api_key'

export default class NetToGross extends LightningElement {
    inputValue;
    submitButton;
    countryCode;
    grossValueFound = false;
    grossValue;

    async renderedCallback() {
        if (!this.grossValueFound) {
        try {
            this.countryCode = await getCurrentlyLoggedInUsersCountryCode();
        } catch (e) {
            console.log(e);
        }
            this.inputValue = this.template.querySelector(".netvalue");
            this.submitButton = this.template.querySelector(".submit");
            this.submitButton.addEventListener('click', () => {
                this.netToGross()
            });
        }
    }

    async netToGross() {
        let netValue = parseFloat(this.inputValue.value);
        if (!netValue) return;
        let url = 'https://api.vatstack.com/v1/rates?';
        let params = [
            {
                parameterName: 'country_code',
                parameterValue: this.countryCode.toUpperCase()
            }
        ];

        for (let param of params) {
            url = url.concat(param.parameterName + "=" + param.parameterValue + "&");
        }

        url = url.slice(0, url.length - 1);
        
        try {
            const response = await fetch(url, {
                headers: {
                "x-api-key": x_api_key
                }
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            this.grossValue = (netValue / (1 - (jsonResponse.rates[0].standard_rate / 100))).toFixed(2) + ` ${jsonResponse.rates[0].currency}`;
            this.grossValueFound = true;
        } catch (err) {
            console.log(err); 
        }
    }
}