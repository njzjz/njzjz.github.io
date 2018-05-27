function FindProxyForURL(url, host)
{
if (shExpMatch(host, "*.baidu.*|baidu.*"))    
        return "PROXY 0.0.0.0:0";
    else
        return "DIRECT";
}