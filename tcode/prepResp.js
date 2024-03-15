

function prepResp(ok=true,status=500,message='unknow final error'){

        return {ok,status,message};

}

module.exports = prepResp;