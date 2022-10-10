/**
 * Test class for Controller Class
 *
 * @author Rukije Bakalli: (rbakalli@deloittece.com)
 * @created  10/10/2022
 */
@IsTest
private class CTRL_NetToGross_TEST {
@IsTest
    public static void shouldReturnCurrentUsersCountryCode(){
    String countryCode = CTRL_NetToGross.getCurrentlyLoggedInUsersCountryCode();
    System.assertEquals('PL', countryCode);
}
}