import dotenv from "dotenv"
dotenv.config()


export default{
    port: 8500,
    host: 'localhost',
    dbURI: process.env.DVENT_DB_URI,
    saltWorkFactor: 10,
    accessTokenTl: '45m',
    refreshTokenTl: '1y',
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGRqEKB1h0q1jmLePaxwoZSbwp+2l0tYQPT/sazbNgLUci84k0s6
HoGfbY7TL4EnpZKWwGPyI/ilQSQHWLn6mcqAVNcfd8+mCip8KIudVRXKhCypGnZa
aKwde6xWKF8lLkpuZkUQdi5UxtAn7tCxXa6dCXhg++HxyGya0OJbMVkNAgMBAAEC
gYAEJ794ZGSs2saBoOC8egy1sZxkL5IjNAu8F7iqhoe9pjzzZ0vxGP6aLpbCCks0
9QcNAeAEQsjqSSxg6UzqpUwn34TSK4+fRPjvXrgmrZ9a6AaAFRBoIFjF9Bp1qdJc
j2+zFHKNi41bTBhFbFPEYjmWTEU6DPbEgGtxj5Lq3wmcAQJBAMaDeLfaNdbwCrTb
SH4exQTkWqZbJ/AANWpewYqJ7McyQOF7vD8EW7rs4gBdLWIr+/15Ms+MUBO9kTp/
GvcNyuECQQCBfiQ4oFqyYvcISny5c28JdMQU0zSrRGBW8bTGVJf0nWeN5Q9qd/j6
LNrXaMrEb5JagtZaO1ND/pZfJD0DDh+tAkEApKxZDsJwGR3E8+RXzW9+5iD75bYG
ejviE5wJFwB1L4TLd4DqVqgp4/UvQTgKNr7f6ZOJh8wQfV+qwoi/+KMzYQJAYPI4
WfCrlkwDWECz+f+TDMhPmKu7DdIGMnGI/scMcMV7Zr8r+HDThTEZshWxYLmLH5o+
spUhtJEgsSAnUWc8jQJACLkGWxzr+ivlirmNdE3DgocYxqdi3JZf+1GVsA5thzWA
cKWpo208Dt/E7Td5rv8epyJqn4u7UN/z7VI31MzRiQ==
-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGRqEKB1h0q1jmLePaxwoZSbwp+2
l0tYQPT/sazbNgLUci84k0s6HoGfbY7TL4EnpZKWwGPyI/ilQSQHWLn6mcqAVNcf
d8+mCip8KIudVRXKhCypGnZaaKwde6xWKF8lLkpuZkUQdi5UxtAn7tCxXa6dCXhg
++HxyGya0OJbMVkNAgMBAAE=
-----END PUBLIC KEY-----`
}