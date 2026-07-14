import os
import uuid
import joblib
import librosa
import numpy as np

# ==========================================================
# PATHS
# ==========================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

MODEL = joblib.load(
    os.path.join(BASE_DIR, "models", "audio", "audio_model.pkl")
)

LABEL_ENCODER = joblib.load(
    os.path.join(BASE_DIR, "models", "audio", "audio_label_encoder.pkl")
)

# ==========================================================
# FEATURE EXTRACTION
# ==========================================================

def extract_features(file_path):

    y, sr = librosa.load(
        file_path,
        sr=22050,
        mono=True
    )

    # MFCC (40)
    mfcc = np.mean(
        librosa.feature.mfcc(
            y=y,
            sr=sr,
            n_mfcc=40
        ),
        axis=1
    )

    # Chroma (12)
    chroma = np.mean(
        librosa.feature.chroma_stft(
            y=y,
            sr=sr
        ),
        axis=1
    )

    # Spectral Contrast (7)
    spectral = np.mean(
        librosa.feature.spectral_contrast(
            y=y,
            sr=sr
        ),
        axis=1
    )

    # RMS
    rms = np.mean(
        librosa.feature.rms(y=y)
    )

    # Zero Crossing Rate
    zcr = np.mean(
        librosa.feature.zero_crossing_rate(y)
    )

    return np.concatenate([
        mfcc,
        chroma,
        spectral,
        [rms],
        [zcr]
    ])

# ==========================================================
# AUDIO ANALYSIS
# ==========================================================

def analyze_audio(file_path):

    print("\n===== AUDIO ANALYSIS STARTED =====")

    features = extract_features(file_path)

    prediction = MODEL.predict([features])[0]

    probabilities = MODEL.predict_proba([features])[0]

    confidence = round(max(probabilities) * 100, 2)

    predicted_label = LABEL_ENCODER.inverse_transform(
        [prediction]
    )[0]

    if predicted_label.lower() == "real":
        status = "Authentic"
        provider = "Human"
    else:
        status = "AI Generated"
        provider = "Voice Clone"

    return {
        "id": str(uuid.uuid4()),
        "name": os.path.basename(file_path),
        "type": "Audio",
        "score": confidence,
        "risk": status,
        "status": status,
        "provider": provider,
        "confidence": confidence
    }
