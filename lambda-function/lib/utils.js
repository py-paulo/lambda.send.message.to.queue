

function transform_tweet_to_params(raw_data) {
    return {
        Id: { DataType: "Number", StringValue: raw_data["id"]},
        CreatedAt: { DataType: "String", StringValue: raw_data["created_at"]}
    }
}

module.exports = {
    transform_tweet_to_params
}