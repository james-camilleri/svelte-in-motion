// Create PRNG
const rand1 = splitmix32(19011992) // These seeds are the same.
const rand2 = splitmix32(19011992) // These seeds are the same.
const rand3 = splitmix32(27022024) // This one is not.

rand1() // 0.09357932512648404
rand1() // 0.8551728054881096

rand2() // 0.09357932512648404
rand2() // 0.8551728054881096

rand3() // 0.7533022742718458
rand3() // 0.371346035040915
