clientjs
========

Geting the data form the client.

<h3>How to Use?</h3>

Firstly, you should include the js file.

<pre>
<script type="text/javascript" src="client.js"></script>
</pre>

Secodely, you can use the variable window.$client to get the data of the client. $client is an object, including the data as following: 
<pre>
$client = {
    engine: {
        name,
        version
    },
    broswer: {
        name,
        version
    }
    system,
    equipment,
    hasFlash,
    language
}
</pre>

Hope it can help you.
