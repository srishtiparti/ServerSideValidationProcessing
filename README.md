# To execute
Clone in local folder
Run node index.js

# Server Side Validation and Processing
The validations and form processing are on the server-side only.
# HTML Static Content -
WebFormserved using Express. The front end must collect all the information needed to make a sale to the customer. 

•At least 2 products should be available for purchase. The application's business logic must handle the products correctly.
# JavaScript-
Server side form validations and server-side form processing:

•All JavaScript code must be located on the server-side. •The following user inputs must be validated:

•Mandatory fields:

•Name•Address•City•Province

Fields with specific forma

•Phone number validation.eg: 5198201234 Email validation.eg: test@test.com

If any errors exist,display a unique message for each erroneous input. Do not use a JavaScript popup box for this purpose. 

•Generate a receipt to give to the customer,including all the information entered by the user and the products bought.Use only server-side scripting for this. Do not use any client-side code for processing the form.•Calculateandincludesalestaxforeachprovince/territoryinCanada. •Make sure that the receipt is generated only if the customer has bought products worth $10 or more. Otherwise give an error to the customer and tell them that the minimum purchase should be of $10.
