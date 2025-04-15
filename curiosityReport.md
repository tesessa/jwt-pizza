# How Disney performs DevOps
For my curiosity report I read some websites on how Disney has integrated DevOps into their systems. It helped me to learn the importance of devOps as Disney saw tons of improvements by implementing devOps. 
It also was interesting some of the things Disney did which changed their employees mindsets in the process.

[Disney DevOps](https://www.srepath.com/inside-disneys-site-reliability-engineering-practice/)

## Before DevOps
Before Disney integrated devOps into their systems, they had two separate teams of developers and operation teams. These teams didn't work super well together.
The operations team found it hard to deploy the developers code. What Disney did was they first changed the operations teams name to System Engineers. 
This helped the developers otherwise known as Software Engineers see the operations team on the same level as them. This change of name led to more collaboration between the teams.
It was interesting to me how something as simple as a name or title change can improve so much within a company.

In addition to changing the name of the operations team to System Engineers, Disney also decided to not have all their system engineers in one place. 
They had their system engineers spread across the world and integrated within their other teams which they found increased collaboration. This forced daily collaboration. 
This helped me learn the importance of decentralization in the workplace and how it can help increase collaboration and efficency.

## Quality Assurance: Automated Testing
As part of the devOps integration in Disney the included automated testing. Disney has developed a tool called "Simba" which allows them to test changes to infrastructure code before deploying it to production.
They also have their own internal configuration management tool they've created called "Disney Deployment Framework". This framework ensures consistency across different environments and automates the application deployment process.
This allows Disney to have greater reliability and consistency.

## Deployment: Continuous Integration and Delivery
One thing Disney has implemented into their system is using configuration management tools to automate their deployment system. This has led to vast improvements in Disney.
Disney is using configuration management tools Puppet and Chef to achieve this. They found that using these led to the average time to deploy a new environement decreasing from 2 weeks to 2 hours.
One example of how this improved Disney is before they had configuration management multiple engineers would spend 8 hours each night manually updating the 100 servers associated with the Toy Story Midway Mania Attraction.
After adding configuration management they were able to improve this process to only needing one person to update the 100 servers in 30 minutes! That is a huge improvement

That example really opened my eyes to how DevOps can seriously improve a company and change how a company does things. I never realized how much time workers would spend doing things like that for a company whereas devOps could fix that.
When I read this I thought if Disney was spending that much time for one attraction, how many workers and time was spent on updating the servers for each attraction at Disney. Decreasing that time spent and the amount of workers doing that must've saved  lot of money for Disney.
And it probably helped the workers to focus on other things besides always updating the servers manually each night.

## Observability
Another thing Disney implemented when switching to DevOps practices was making sure they had good observabilities of their website.
Disney uses Splunk for logging analysis, Grafana for metrics visualization and PagerDuty for incident management. 
Splunk allows them to efficiently analyze logs, Grafana helps Disney gain better understanding of systems performance and PagerDuty allows them to ensure the appropiate teams are notified when critical events occured.

It was interesting to me how a big company like Disney's observability is similar to how we did observability. They use Grafana just like we did. 
I think it helped me to realize how what we've learned in this class applies to real life.

## Disney's 3 C's
Disney has broken down their culture in DevOps to 3 C's
1. Collaboration: Breaking down silos and working towards common goals
2. Curiosity: constantly experimenting
3. Courage: Being candid, challenging each other, and not engaging in blame or witch-hunting

I liked how Disney has a set of values they try to follow within their DevOps team. I liked learning about this and how this company tries to make sure their employees are collaborating and working well together while also pushing the boundaries and learning more through curiosity.
These are things we've learned in this class through learning about DevOps and I think it will be really useful for when we actually are working a job in the future from our degree.

Overall I learned how important DevOps is by reading how it has improved a big company like Disney. I also learned the importance of collaboration within DevOps and continually testing new things to help reduce time and cost spent within different things in a company. It was cool to see how Disney's DevOps integration related to what we learned in this class.
I am glad to have taken this class and learned about DevOps!!
