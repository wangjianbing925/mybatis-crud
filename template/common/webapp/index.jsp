<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="/common/common.jsp" %>
<!DOCTYPE html>
<html lang="en" data-ng-app="dadaSports">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="{{app.description}}">
    <meta name="keywords" content="教师考试宝管理系统">
    <title>教师考试宝管理系统</title>
    <!-- Bootstrap styles-->
    <script>
        if (location.href.indexOf('login') != -1) {
            location.href = '${ctx}/bg/login/out'
        }
    </script>
    <link rel="stylesheet" href="${ctx}/build/css/bootstrap.css" data-ng-if="!app.layout.isRTL">
    <link rel="stylesheet" href="${ctx}/build/css/bootstrap-rtl.css" data-ng-if="app.layout.isRTL">
    <!-- Application styles-->
    <link rel="stylesheet" href="${ctx}/build/css/app.css?v=${version}" data-ng-if="!app.layout.isRTL">
    <link rel="stylesheet" href="${ctx}/build/css/app-rtl.css?v=${version}" data-ng-if="app.layout.isRTL">
    <!-- Themes-->
    <link rel="stylesheet" ng-href="${ctx}/{{app.layout.theme}}?v=${version}" data-ng-if="app.layout.theme">
    <style>
        .img-circle {
            overflow: hidden;
        }
    </style>
</head>

<body data-ng-class="{ 'layout-fixed' : app.layout.isFixed, 'aside-collapsed' : app.layout.isCollapsed, 'layout-boxed' : app.layout.isBoxed, 'layout-fs': app.useFullLayout, 'hidden-footer': app.hiddenFooter, 'layout-h': app.layout.horizontal, 'aside-float': app.layout.isFloat, 'offsidebar-open': app.offsidebarOpen, 'aside-toggled': app.asideToggled}">
<div data-ui-view="" data-autoscroll="false" class="wrapper"></div>
<script>
    var contextPath = '${ctx}';
    var dataUrl = contextPath;
    var uploadPath = contextPath + '/bg/img/upload';
    var imgPath = 'http://localhost:8080/';
</script>
<script src="${ctx}/build/js/base.js?v=${version}"></script>
<script src="${ctx}/build/js/app.js?v=${version}"></script>
</body>

</html>