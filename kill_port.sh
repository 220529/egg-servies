#!/bin/bash
port=59284
pid=$(netstat -ano | grep $port | awk '{print $5}' | head -n 1)
if [ ! -z "$pid" ]; then
  cmd //c "taskkill /PID $pid /F"
  echo "已终止进程 $pid"
else
  echo "端口 $port 未被占用"
fi