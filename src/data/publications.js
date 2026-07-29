const publications = [
  {
    id: 'dfrag-patient',
    year: '2026',
    title:
      'dFRAG-Patient: An Enterprise-Grade, Privacy-Preserving Decentralized Federated RAG Framework for Adaptive Psychiatric Decision Support',
    authors:
      'Immanuvel Prathap Sagayaraju, Anisha Sharma, Pallav Gupta, Thamizh Mani R, Sujithra Kanmani R.',
    venue: 'Springer Book Chapter',
    status: 'Manuscript in preparation',
    summary:
      'A federated retrieval-augmented generation framework that lets psychiatric clinics collaboratively train adaptive decision-support models without ever sharing patient records. Built for enterprise deployment and clinical governance.',
    link: null,
  },
  {
    id: 'bci-calibration',
    year: '2026',
    title:
      'Overcoming the BCI Calibration Bottleneck: A Clinically-Grounded Architecture Using Riemannian Alignment and Stochastic Weight Averaging',
    authors: 'Immanuvel Prathap Sagayaraju',
    venue: 'arXiv Preprint',
    status: 'Preprint',
    summary:
      'A calibration-reduction brain-computer interface pipeline combining per-session independent component analysis, Riemannian Euclidean alignment, EEGNet and stochastic weight averaging. Participant-independent evaluation on MOABB BNCI2014-001 motor-imagery benchmark achieved a mean leave-one-subject-out accuracy of 74.31% across nine folds.',
    link: 'https://arxiv.org/abs/2607.16225',
  },
  {
    id: 'rice',
    year: '2026',
    title: 'RICE: A Framework for Image Encryption',
    authors: 'Immanuvel Prathap Sagayaraju',
    venue: 'IEEE Transactions on Information Forensics and Security',
    status: 'Manuscript under review',
    summary:
      'An image-encryption and decryption framework integrating directional image segmentation, steganography and chaotic-map-based encryption. Designed for secure media transmission and forensic integrity.',
    link: null,
  },
  {
    id: 'agro-spray',
    year: '2017',
    title: 'Agro Spray Suit',
    authors: 'Immanuvel Prathap Sagayaraju',
    venue: "Bachelor's Thesis, Jain University, Bangalore",
    status: 'Thesis',
    summary:
      'Designed and evaluated a customised palm-and-arm spraying system to automate and optimise knapsack-based agricultural spraying, reducing operator fatigue and chemical exposure.',
    link: null,
  },
];

export const researchStreams = [
  {
    id: 'federated-rag',
    title: 'Federated RAG for Psychiatry',
    tags: ['Federated Learning', 'RAG', 'Privacy', 'Mental Health'],
    summary:
      'dFRAG-Patient brings together decentralized learning and retrieval-augmented generation so psychiatric clinics can build shared decision-support models while keeping patient data at the source.',
    status: 'Manuscript in preparation',
  },
  {
    id: 'bci',
    title: 'BCI Calibration Reduction',
    tags: ['EEG', 'Riemannian Geometry', 'Stochastic Weight Averaging', 'MOABB'],
    summary:
      'A clinically grounded motor-imagery BCI pipeline that removes the per-session calibration burden through Riemannian alignment and model-agnostic weight averaging.',
    status: 'arXiv preprint',
  },
  {
    id: 'image-encryption',
    title: 'Image Encryption — RICE',
    tags: ['Cryptography', 'Steganography', 'Chaotic Maps', 'Forensics'],
    summary:
      'RICE combines directional segmentation, steganography and chaotic-map encryption into a single secure media-encryption framework.',
    status: 'Under review',
  },
  {
    id: 'ecg-anomaly',
    title: 'ECG Time-Series Anomaly Detection',
    tags: ['PyTorch', 'RNN', 'ECG', 'Time Series'],
    summary:
      'A two-stage anomaly-detection pipeline for electrocardiogram signals using recurrent sequence prediction with anomaly-score thresholding.',
    status: 'Technical project',
  },
  {
    id: 'crop-detection',
    title: 'Broccoli Crop Detection from Drone Footage',
    tags: ['Computer Vision', 'Object Detection', 'Agriculture'],
    summary:
      'Custom object-detection pipeline to identify broccoli plants in aerial drone footage, supporting automated crop monitoring and yield estimation.',
    status: 'Technical project',
  },
  {
    id: 'sentiment',
    title: 'Amazon Reviews Sentiment Analysis',
    tags: ['TensorFlow', 'Keras', 'LSTM', 'NLP'],
    summary:
      'LSTM-based sentiment-classification model that reads Amazon product reviews and classifies customer sentiment from unstructured textual feedback.',
    status: 'Technical project',
  },
];

export default publications;
