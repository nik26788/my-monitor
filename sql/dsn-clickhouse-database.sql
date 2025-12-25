create table base_monitor_storage
(
    app_id     String,
    info       String,
    created_at DateTime default now(),
    event_type String,
    message    String
)
    engine = MergeTree ORDER BY tuple()
        SETTINGS index_granularity = 8192;

CREATE MATERIALIZED VIEW nick.base_monitor_view
            (
             `app_id` String,
             `info` String,
             `created_at` DateTime,
             `event_type` String,
             `message` String,
             `processed_message` String
                )
            ENGINE = MergeTree
                ORDER BY tuple()
                SETTINGS index_granularity = 8192
AS
SELECT app_id,
       info,
       created_at,
       event_type,
       message,
       concat('miaoma', event_type) AS processed_message
FROM nick.base_monitor_storage;


