import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function calculateMatchScore(userProfile, scholarship) {
  // Simplified matching algorithm
  let score = 0;
  const factors = [];

  // GPA matching
  if (scholarship.minGpa && userProfile.gpa) {
    if (userProfile.gpa >= scholarship.minGpa) {
      score += 25;
      factors.push('GPA requirement met');
    }
  }

  // Major matching
  if (scholarship.requiredMajors?.length && userProfile.major) {
    if (scholarship.requiredMajors.includes(userProfile.major)) {
      score += 30;
      factors.push('Major alignment');
    }
  }

  // Demographic matching
  if (scholarship.demographics && userProfile.demographics) {
    // Add demographic scoring logic
    score += 20;
    factors.push('Demographic criteria');
  }

  // Activity matching
  if (scholarship.preferredActivities && userProfile.activities) {
    const activityMatches = userProfile.activities.filter((activity) =>
      scholarship.preferredActivities.includes(activity)
    );
    score += Math.min(activityMatches.length * 5, 25);
    if (activityMatches.length > 0) {
      factors.push('Activity alignment');
    }
  }

  return Math.min(score, 100);
} 