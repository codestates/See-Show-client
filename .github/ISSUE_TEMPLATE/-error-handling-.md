---
name: "[Error Handling]"
about: 에러 있을 시 공유
title: ''
labels: Error
assignees: ''

---

*해결된 에러라면 라벨에 'Complete' 를 달아주세요.
*미해결된 에러라면 라벨을 'In progress' 로 변경해주세요.

## 어떤 에러인가요?
TypeORM에서 조인 컬럼을 사용할 때 만난 에러

## 에러 메시지
``` $ 터미널의 에러 코드를 여기 넣어주세요. ```

## 에러 핸들링 방법
* typeorm의 joincolumn을 작성하고, 그 안의 데이터를 innerJoin 혹은 leftJoin등으로 조합할 때, 해당 칼럼의 값을 정확 명확하게 써줘야함.
``` return this.createQueryBuilder("diary")
	.innerJoin("diary.post", "post")
	.innerJoin("diary.user", "user")
	.where("diary.post_id = :post_id", { post_id: postid })
	.andWhere("diary.user_id = :user_id", { user_id: userid })
	.getMany();
```
위 코드에서, join Column값이 post_id / user_id였기 때문에 이렇게 명확하게 써주지 않으면, 값이 join 되지 않음

* 에러 핸들링을 위해 참고한 레퍼런스 링크
링크
