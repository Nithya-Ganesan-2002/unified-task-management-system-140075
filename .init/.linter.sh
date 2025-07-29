#!/bin/bash
cd /home/kavia/workspace/code-generation/unified-task-management-system-140075/task_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

