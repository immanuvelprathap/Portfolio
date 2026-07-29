import { v4 as uuidv4 } from 'uuid';
import AutomobileImg from '../assets/images/Automobile.jpg';
import ETLImg from '../assets/images/ETL.png';
import WarehouseImg from '../assets/images/Warehouse_inventory.jpg';
import GradientDescentImg from '../assets/images/Gradient_descent.webp';
import AgroSpraySuitImg from '../assets/images/Agro_Spray_Suit.png';

const projects = [
  {
    id: uuidv4(),
    name: 'Zero-Calibration BCI',
    branch: 'Neural Decoding',
    glyph: '\u25C9',
    desc: 'Overcoming the BCI calibration bottleneck: a clinically grounded architecture that aligns EEG covariance matrices on a Riemannian manifold and stabilises them with stochastic weight averaging \u2014 so a brain-computer interface works from the first thought, with no warm-up session.',
    tags: ['EEG', 'Riemannian Alignment', 'SWA', 'PyTorch'],
    link: 'https://github.com/immanuvelprathap/Zero-Calibration-BCI',
    img: null,
  },
  {
    id: uuidv4(),
    name: 'ECG Anomaly Detection',
    branch: 'Signals of the Body',
    glyph: '\u2665',
    desc: 'Recurrent autoencoders over electrocardiogram time series that learn the shape of a healthy heartbeat and flag the beats that depart from it \u2014 unsupervised anomaly detection on physiological rhythm.',
    tags: ['RNN', 'Time Series', 'Anomaly Detection'],
    link: 'https://github.com/immanuvelprathap/Electrocardiogram-Anomaly-Detection-RNN-Time-Series',
    img: null,
  },
  {
    id: uuidv4(),
    name: 'ECG AI Backend',
    branch: 'Signals of the Body',
    glyph: '\u2318',
    desc: 'A service layer that carries cardiac models from notebook to clinic: inference endpoints, signal preprocessing and the plumbing that makes a medical model usable by something other than its author.',
    tags: ['Python', 'API', 'MLOps'],
    link: 'https://github.com/immanuvelprathap/ecg-ai-backend',
    img: null,
  },
  {
    id: uuidv4(),
    name: 'Gradient Descent, From Scratch',
    branch: 'Foundations',
    glyph: '\u2207',
    desc: 'The learning rule itself, written in plain object-oriented Python \u2014 cost, weight and bias walked downhill step by step, because the intuition behind every deep model lives in this one loop.',
    tags: ['Optimisation', 'Python', 'Teaching'],
    link: 'https://github.com/immanuvelprathap/DataStructures-Algorithms-ML-concepts-using-Python',
    img: GradientDescentImg,
  },
  {
    id: uuidv4(),
    name: 'Warehouse Inventory Clustering',
    branch: 'Industry',
    glyph: '\u2732',
    desc: 'Unsupervised k-means over product families to decide where stock should physically live, re-clustering as movement shifts from low frequency to high \u2014 geometry applied to a warehouse floor.',
    tags: ['k-Means', 'Unsupervised', 'Operations'],
    link: 'https://github.com/immanuvelprathap/KMeans-Clustering-Unsupervised-ML-Projects',
    img: WarehouseImg,
  },
  {
    id: uuidv4(),
    name: 'ETL \u2192 Insight Pipeline',
    branch: 'Industry',
    glyph: '\u21C4',
    desc: 'Sales data extracted, transformed and loaded through MySQL into Power BI, turning a large unloved dataset into the handful of numbers a business actually decides with.',
    tags: ['MySQL', 'ETL', 'Power BI'],
    link: 'https://github.com/immanuvelprathap/ETL-Sales_Analysis_Report---MySQL-PowerBI',
    img: ETLImg,
  },
  {
    id: uuidv4(),
    name: 'Automobile Price Regression',
    branch: 'Foundations',
    glyph: '\u2261',
    desc: 'Data acquisition and wrangling straight off the web, then a linear model that prices a used car \u2014 the full unglamorous path from raw HTML to a defensible prediction.',
    tags: ['Regression', 'Data Wrangling', 'Pandas'],
    link: 'https://github.com/immanuvelprathap/Automobile-Data',
    img: AutomobileImg,
  },
  {
    id: uuidv4(),
    name: 'Agri Spray Suit',
    branch: 'Industry',
    glyph: '\u2698',
    desc: 'Baccalaureate work: a wearable dual-integrated spraying system replacing the knapsack sprayer, paired with drone mapping and vision models reading the field it walks through.',
    tags: ['Mechanical Design', 'Computer Vision', 'Drones'],
    link: 'https://drive.google.com/file/d/158h0RbqeN4Mrw5YY08m_7iMTisaANuKo/view?usp=sharing',
    img: AgroSpraySuitImg,
  },
];

export default projects;
