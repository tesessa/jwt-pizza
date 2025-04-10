# Penetration Attack Report
## Tessa Andersen and Lylah Liu

## 1. Self Attack
## Tessa Andersen
I tried doing an SQL attack. I found the vulnerability in the database code for updateUser and getUserFranchises
```javascript
const franchises = await this.query(connection, `SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})`);
```

```javascript
const query = `UPDATE user SET ${params.join(', ')} WHERE id=${userId}`;
```
Since both of these query commands are putting the parameters/strings directly into the query without any ? value to make sure there is no malicious code this could lead to an SQL injection attack.
I tried for hours to perform an SQL injection attack and just couldn't get the syntax right, but I did still change that code since I knew the vulnerability existed. For the user I changed it to be
```javascript
const query = `UPDATE user SET ${params.join(', ')} WHERE id=?`;
```

If the attack had succeeded it would have been a severity 1 because I could have used DROP TABLE users;

| Item           | Result                                                                         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | April 9, 2025                                                                  |
| Target         | pizza.byucsstudent.click                                                       |
| Classification | Injection                                                                      |
| Severity       | 1                                                                              |
| Description    | SQL injection failed                                                           |  
| Corrections    | Sanitize user inputs.                                                          |

I also knew the vulnerability with the default admin user. I didn't perform any attacks with that, because it is pretty obvious what you could do. You could consistently add menu items, 
or delete all the franchises and stores. You could also use it to update all the users passwords and usernames and update the admin itself. I didn't perform this attack because it was obvious.
But I went and used the update user endpoint to udpate the admin user so my partner couldn't access it.

## Lylah Liu


