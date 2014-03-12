clientjs
========

Geting the data form the client.

<h3>How to Use?</h3>

Firstly, you should include the js file.

<code>
<script type="text/javascript" src="client.js"></script>
</code>

Secodely, you can use the variable window.$client to get the data of the client. $client is an object, including the data as following: 
<code>
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
</code>

Hope it can help you.
