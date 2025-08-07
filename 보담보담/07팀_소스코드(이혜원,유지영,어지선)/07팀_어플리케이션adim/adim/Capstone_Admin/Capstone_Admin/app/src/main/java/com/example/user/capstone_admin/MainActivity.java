package com.example.user.capstone_admin;

import android.content.ContentValues;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;


import org.json.JSONArray;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
    Button btnOpen, btnSend, btnPw, btnAbn;
    View  dialogSendView;
    EditText etSendBody;
    TextView tvSend;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btnPw=(Button)findViewById(R.id.Btn_Ad_Pw);
        btnAbn=(Button)findViewById(R.id.Btn_Ad_Abn);
        btnOpen=(Button)findViewById(R.id.Btn_Ad_Open);
        btnSend = (Button)findViewById(R.id.Btn_Ad_Send);

        NetworkUtil.setNetworkPolicy();

       // String url = "http://192.168.0.12/info.php";

        //1번 OPEN
        btnOpen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(),Open_activity.class);
                startActivity(intent);
            }
        });

        //2번 공지수신
        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialogSendView = (View) View.inflate(MainActivity.this, R.layout.send_activity, null);
                final AlertDialog.Builder dlg1 = new AlertDialog.Builder(MainActivity.this);
                dlg1.setView(dialogSendView);

                tvSend = (TextView) dialogSendView.findViewById(R.id.TvSend);

                registerForContextMenu(tvSend);
                tvSend.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        PopupMenu p =new PopupMenu(getApplicationContext(),view);
                        getMenuInflater().inflate(R.menu.send_menu,p.getMenu());
                        p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                            @Override
                            public boolean onMenuItemClick(MenuItem menuItem) {
                                switch (menuItem.getItemId()){
                                    case R.id.itemTestStuId:
                                        tvSend.setText(menuItem.getTitle());
                                        break;
                                    default:
                                        break;
                                }
                                return false;
                            }
                        });
                        p.show();
                    }
                });


                dlg1.setPositiveButton("송신", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int i) {
                        etSendBody = (EditText)dialogSendView.findViewById(R.id.EtSendBody);
                        etSendBody.setMovementMethod(new ScrollingMovementMethod());
                        try {
//                            PHPRequest request = new PHPRequest("http://192.168.0.12/Adim_notice_insert.php");
                            PHPRequest request = new PHPRequest("http://172.16.120.18/Adim_notice_insert.php");
                            String result = request.PhPnotText(String.valueOf(etSendBody.getText()));
                            if(result.equals("1")){
                                Toast.makeText(getApplication(),"공지송신",Toast.LENGTH_SHORT).show();
                            }
                            else{
                                Toast.makeText(getApplication(),"오류",Toast.LENGTH_SHORT).show();
                            }
                        }catch (MalformedURLException e){
                            e.printStackTrace();
                        }
                    }
               });
                dlg1.setNegativeButton("취소",null);
                dlg1.show();
            }
        });

        //3번 비밀번호 변경
        btnPw.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            Intent intent=new Intent(getApplicationContext(),Pw_activity.class);
            startActivity(intent);
        }
    });

        //4번 이상정보 확인
        btnAbn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(getApplicationContext(),Abn_activity.class);
                startActivity(intent);
            }
        });

    }

}
