var minMovesToMakePalindrome = function(s) {
    let left = 0, right = s.length-1, ans = 0;
    
    const list = s.split('')
    
    while (left < right) {
        let l = left, r = right;
        // console.log('before', l , r)
        while (list[l] != list[r]) {
          r--;
        }
        // console.log('f', l , r)
        if (l == r) {
            ans++;
            console.log('if', l, r, list)
            const tmp = list[r]
            list[r] = list[r+1]
            list[r+1] = tmp
            continue;
        } else {
          // console.log('else', l, r)
          while (r < right) {
              const tmp = list[r]
              list[r] = list[r+1]
              list[r+1] = tmp
              console.log(list.join(''))
              ans++;
              r++;
          }   
        }
        left++;
        right--;
    }
    
    return ans;
};

console.log(minMovesToMakePalindrome('zkzkzkz'))