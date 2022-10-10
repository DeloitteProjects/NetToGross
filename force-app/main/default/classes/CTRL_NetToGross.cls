/**
 * Controller class for User
 *
 * @author Rukije Bakalli: (rbakallii@deloittece.com)
 * @created  10/10/2022
 */

public with sharing class CTRL_NetToGross {
    @AuraEnabled(Cacheable=true)

    public static String getCurrentlyLoggedInUsersCountryCode() {

        Id userId = UserInfo.getUserId();
        User user = new SEL_User().getUserById(userId);
        if (user == null) {
            return null;
        }
        System.debug('address' + user.Address.getCountryCode());
        return user.Address.getCountryCode();

    }
}