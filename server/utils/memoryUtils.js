function getFirstMemoryUnit(memoryUsage) {
    const usedPart = memoryUsage.split(" ")[0]; // Lấy phần trước dấu cách, ví dụ "27.05MiB"
    const match = usedPart.match(/[a-zA-Z]+$/); // Tìm đơn vị từ phần "used"
    return match ? match[0] : "B";              // Trả về đơn vị hoặc "B" nếu không tìm thấy
}

module.exports = {
    getFirstMemoryUnit
} 