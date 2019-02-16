import * as posenet from "@tensorflow-models/posenet";

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
export function isMobile() {
  return isAndroid() || isiOS();
}

export function checkMidStomach(keypoints, minConfidence) {
  let pointsOfInterest = {
    leftWrist: { point: keypoints[9] },
    leftHip: { point: keypoints[11] },
    leftShoulder: { point: keypoints[5] }
  };
  let confidentPoints = Object.keys(pointsOfInterest).filter(function(key) {
    return pointsOfInterest[key].point.score >= minConfidence;
  });
  if (confidentPoints.length === 3) {
    const bodyLength = Math.abs(
      pointsOfInterest["leftShoulder"].point.position.y -
        pointsOfInterest["leftHip"].point.position.y
    );

    const lowerThreshold =
      pointsOfInterest["leftShoulder"].point.position.y + 0.3 * bodyLength;
    const upperThreshold =
      pointsOfInterest["leftShoulder"].point.position.y + 0.6 * bodyLength;
    const handLocation_y = pointsOfInterest["leftWrist"].point.position.y;

    if (lowerThreshold < handLocation_y && handLocation_y < upperThreshold) {
      return true;
    }
  }
  return false;
}
export function drawKeypoints(
  keypoints,
  minConfidence,
  skeletonColor,
  ctx,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      if (keypoint.part === "leftWrist") {
      }

      const { y, x } = keypoint.position;
      ctx.beginPath();
      ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI);
      ctx.fillStyle = skeletonColor;
      ctx.fill();
    }
  });
}

function toTuple({ y, x }) {
  return [y, x];
}
function drawSegment([ay, ax], [by, bx], color, lineWidth, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  ctx,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      ctx
    );
  });
}
