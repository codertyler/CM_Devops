'use strict'
const AWS = require('aws-sdk');
const https = require('https');

//Assigning IP range JSON into a variable
const ipRangesUrl = 'https://ip-ranges.atlassian.com/';

//Get IP ranges from Atlassian
const getIpRanges = () => {
  return new Promise((resolve, reject) => {
    https.get(ipRangesUrl, (response) => {
      let data = '';
      response.setEncoding('utf8');
      response.on('data', (d) => { data += d;});
      response.on('error', (e) => { return reject(e);});
      response.on('end', () => {
        return resolve(JSON.parse(data))
      })
    })
  })
}

//Convert the IP range objec to SG Ingress Rule
const toRule = (rangeObject) => {
  return {
    FromPort: target.port,
    ToPort: target.port, 
    IpProtocol: target.port,
    IpRanges: [
      {
        CidrIp: rangeObject.cidr
      }
    ]
  };
};

// Add Ingress Rules to SG
const addIngressRules = (ipRanges) => {
  return new Promise((resolve, reject) => {
    const rules = ipRanges.
      items.
      filter((i) => {
        return i.service === target.service && i.region === target.region;
      }).
      map(toRule);
    const params = { GroupId: target.securityGroupId, IpPermissions: rules };
    console.log(`Adding ${rules.length} ingress rules (as one rule)`);
    ec2.authorizeSecurityGroupIngress(params, (err, data) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};
