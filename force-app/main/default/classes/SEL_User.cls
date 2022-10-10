/**
 * Selector class for User object.
 *
 * @author Rukije Bakalli (rbakalli@deloittece.com)
 * @created 10/10/2022
 */

public with sharing class SEL_User {


 private static final List<String> fields = new List<String>{
         'Address'
 };
    /**
  * Gets User record based on User id
  * @param userId (Id):  A User record
  *
  * @return User: Corresponding user record
  */
    public User getUserById(Id userId ){
        String query = 'SELECT ' + String.join(fields, ',') +
                ' FROM User' +
                ' WHERE Id =: userId' ;
        return Database.query((String.escapeSingleQuotes(query)));
    }
}