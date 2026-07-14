import os
import uuid
import joblib

# ==========================================================
# PATHS
# ==========================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# ==========================================================
# LOAD MODEL (Only once when FastAPI starts)
# ==========================================================

MODEL = joblib.load(
    os.path.join(BASE_DIR, "models", "text", "text_model.pkl")
)

VECTORIZER = joblib.load(
    os.path.join(BASE_DIR, "models", "text", "vectorizer.pkl")
)

LABEL_ENCODER = joblib.load(
    os.path.join(BASE_DIR, "models", "text", "label_encoder.pkl")
)

# ==========================================================
# DISPLAY NAME MAPPING
# ==========================================================

MODEL_DISPLAY_NAMES = {
    "human": "Human",

    "gpt": "GPT",
    "ada": "GPT",
    "babbage": "GPT",
    "curie": "GPT",
    "davinci": "GPT",

    "claude": "Claude",
    "llama": "Llama",
    "mistral": "Mistral",
    "falcon": "Falcon",
    "cohere": "Cohere",
    "palm": "Palm"
}

# ==========================================================
# TEXT ANALYSIS
# ==========================================================

def analyze_text_content(text: str):
    try:
        print("\n===== TEXT ANALYSIS STARTED =====")

        print("Input received.")

        predicted_index = MODEL.predict([text])[0]
        print("Prediction Index:", predicted_index)

        predicted_label = LABEL_ENCODER.inverse_transform([predicted_index])[0]

        label = str(predicted_label).strip().lower()

        display_name = MODEL_DISPLAY_NAMES.get(
            predicted_label.lower(),
            predicted_label.title()
        )

        print("Predicted Label:", repr(predicted_label))
        print("Display Name:", display_name)

        probabilities = MODEL.predict_proba([text])[0]
        print("Probabilities generated.")

        class_names = LABEL_ENCODER.classes_

        # Combine probabilities for models that belong to the same family
        
        probability_dict = {}

        for class_name, prob in zip(class_names, probabilities):

            label = str(class_name).strip().lower()

            display = MODEL_DISPLAY_NAMES.get(
                label,
                str(class_name)
            )

            if display not in probability_dict:
                probability_dict[display] = 0

            probability_dict[display] += float(prob) * 100

        # Round values
        probability_dict = {
            key: round(value, 2)
            for key, value in probability_dict.items()
        }

        # Sort by highest probability first
        probability_dict = dict(
            sorted(
                probability_dict.items(),
                key=lambda item: item[1],
                reverse=True
            )
        )

        confidence = round(max(probabilities) * 100, 2)

        if predicted_label.lower() == "human":
            status = "Authentic"
        else:
            status = "AI Generated"

        result = {
            "id": str(uuid.uuid4()),
            "name": "Text Submission",
            "type": "Text",
            "score": confidence,
            "risk": status,
            "status": status,
            "detected_model": display_name,
            "provider": display_name,
            "confidence": confidence,
            "probabilities": probability_dict
        }

        print("Returning Result.")
        return result

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise