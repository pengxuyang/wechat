package com.amao.wechat.db;

import com.amao.wechat.model.Target;
import com.amao.wechat.model.TargetExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int countByExample(TargetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int deleteByExample(TargetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int insert(Target record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int insertSelective(Target record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    List<Target> selectByExample(TargetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    Target selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int updateByExampleSelective(@Param("record") Target record, @Param("example") TargetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int updateByExample(@Param("record") Target record, @Param("example") TargetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int updateByPrimaryKeySelective(Target record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table target
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    int updateByPrimaryKey(Target record);
}