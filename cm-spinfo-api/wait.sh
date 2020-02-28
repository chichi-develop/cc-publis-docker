#!/bin/sh -e

cmd="$@"

echo "waiting for 5 seconds to setup mysql..."
sleep 5

exec $cmd
