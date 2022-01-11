import {LightningElement, api, track} from 'lwc';

export default class expressionLine extends LightningElement {
    @api field;


    @api objectType;
    @api operator = 'equals';
    @api value;
    @api renderType = 'text';
    @api expressionId;
    @api expressionIndex;
    @api availableMergeFields = [];
    @api disableRemoveExpression = false;

    @track allOperators = [
        {value: 'equals', label: 'Equals', types: 'text,number,datetime,date'},
        {value: 'not_equal_to', label: 'Not Equal To', types: 'text,number,datetime,date'},
        {value: 'greater_then', label: 'Greater than', types: 'number,datetime,date'},
        {value: 'greater_or_equal', label: 'Greater Or Equal', types: 'number,datetime,date'},
        {value: 'less_then', label: 'Less Than', types: 'number,datetime,date'},
        {value: 'less_or_equal', label: 'Less Or Equal', types: 'number,datetime,date'},
        {value: 'contains', label: 'Contains', types: 'text'},
        {value: 'starts_with', label: 'Starts with', types: 'text'},
        {value: 'end_with', label: 'End with', types: 'text'}
    ];
    labels = {
        supportedCharactersRegex: '^[a-zA-Z0-9_,.\\- !]*$',
        unsupportedCharactersMessage: "Value contains unsupported characters."
    }
    @track filterValue = '';

    get availableOperators() {
        if (this.field) {
            return (this.allOperators.filter(curOperator => curOperator.types.includes(this.renderType)));
        } else {
            return [];
        }
    }

    get disabledFilter() {
        return !this.field;
    }
    
    handleOperatorChange(event) {
        this.operator = event.detail.value;
        let customEvent = new CustomEvent('change', { detail: {operator: this.operator, value : this.value}});
        this.dispatchEvent(customEvent);
    }

    handleValueChange(event) {
        if(this.validate()){
            this.value = event.target.value;
            let customEvent = new CustomEvent('change', { detail: {operator: this.operator, value : this.value}});
            this.dispatchEvent(customEvent);
        }
    }

    @api
    validate() {
        console.log('expressionLine 1');
        let validity = {
            isValid: true
        };
        console.log('expressionLine 2');
        let inputsToVerify = this.template.querySelectorAll('lightning-input');
        if (inputsToVerify && inputsToVerify.length) {
            inputsToVerify.forEach(curInput => {
                let reportedValidity = curInput.reportValidity();
                if (!reportedValidity) {
                    validity.isValid = false;
                    validity.errorMessage = this.labels.unsupportedCharactersMessage;
                    return validity;
                }
            })
        }
        console.log('expressionLine 3');
        return validity;
    }
}