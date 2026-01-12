import os

import dspy  # type: ignore
import mlflow
from mlflow.genai import agent_server

# Enabling tracing for DSPy
mlflow.dspy.autolog()  # pyright: ignore[reportPrivateImportUsage]

# Optional: Set a tracking URI and an experiment
mlflow.set_tracking_uri("http://localhost:8080")
mlflow.set_registry_uri("http://localhost:8080")
# mlflow.set_registry_uri("databricks")
mlflow.set_experiment("DSPy")
# mlflow.set_experiment("/Users/joeldodge@gmail.com/DSPy")

os.environ["ANTHROPIC_API_KEY"] = (
    "my-key"
)
dspy.configure(  # pyright: ignore[reportUnknownMemberType]
    lm=dspy.LM("anthropic/claude-haiku-4-5"),
    # lm=dspy.LM("anthropic/claude-sonnet-4-5"),
    adapter=dspy.JSONAdapter(),
)
# dspy.configure(lm=dspy.LM("anthropic/claude-haiku-4-5"))  # pyright: ignore[reportUnknownMemberType]

# Need to import the agent to register the functions with the server
from agent import agent  # pyright: ignore[reportUnusedImport] # noqa: F401

server = agent_server.AgentServer("ResponsesAgent")
app = server.app

# Optionally, set up MLflow git-based version tracking
# to correspond your agent's traces to a specific git commit
# agent_server.setup_mlflow_git_based_version_tracking()


def main():
    # To support multiple workers, pass the app as an import string
    server.run(app_import_string="server:app")


if __name__ == "__main__":
    main()
