function randomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function between(val, val1, val2)
{
    if((val>val1 && val<val2) || (val>val2 && val<val1) || val==val1 ||val==val2) return true;
    else return false;
}