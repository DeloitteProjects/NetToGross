/**
 * Test class for Selector User
 *
 * @author Rukije Bakalli (rbakalli@deloittece.com)
 * @created 10/10/2022
 */

@isTest

private class SEL_User_TEST{
    @isTest
    private static void shouldReturnUserByUserId() {
        String profileName = 'System Administrator';
        Profile p = [SELECT Id FROM Profile WHERE Name = :profileName];
        User u = new User(Alias = 'standt', Email = 'standarduser@testorg.com',
                EmailEncodingKey = 'UTF-8', LastName = 'Testing', LanguageLocaleKey = 'en_US',
                LocaleSidKey = 'en_US', ProfileId = p.Id,
                TimeZoneSidKey = 'America/Los_Angeles', Username = 'rukiiiiiiii@testorg.com', Country = 'Poland');
        insert u;

        User actualRecord = new SEL_User().getUserById(u.Id
        );

        System.assertEquals(u.Id, actualRecord.Id);
    }
}