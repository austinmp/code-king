import json
import os
# Import the user submitted code.
from submission import submission


test_input = json.loads(os.environ.get("INPUT"))
print(json.dumps(submission(*test_input)))
