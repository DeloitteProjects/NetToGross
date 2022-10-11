/**
 * Test class for Controller Class
 *
 * @author Rukije Bakalli: (rbakalli@deloittece.com)
 * @created  10/10/2022
 */
@IsTest
private class CTRL_NetToGross_TEST {
    @IsTest
    public static void shouldReturnCurrentUsersCountryCode() {
        String profileName = 'System Administrator';
        Profile p = [SELECT Id FROM Profile WHERE Name = :profileName];
        User user = new User(Alias = 'standt', Email = 'standarduser@testorg.com',
                EmailEncodingKey = 'UTF-8', LastName = 'Testing', LanguageLocaleKey = 'en_US',
                LocaleSidKey = 'en_US', ProfileId = p.Id,
                TimeZoneSidKey = 'America/Los_Angeles', Username = 'rukiiiiiiii@testorg.com', Country = 'Sweden');
        insert user;
        String countryCode = '';
        System.runAs(user) {
            countryCode = CTRL_NetToGross.getCurrentlyLoggedInUsersCountryCode();
        }
        System.assertEquals('SE', countryCode);
    }
}